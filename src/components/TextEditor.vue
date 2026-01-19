<template>
  <div class="text-editor">
    <!-- Панель инструментов -->
    <div class="toolbar mb-2 flex flex-wrap gap-1 p-2 bg-gray-100 rounded-t-lg border border-b-0">
      <button
        v-for="tool in tools"
        :key="tool.command + (tool.param || '')"
        @click="executeCommand(tool.command, tool.param)"
        :title="tool.title"
        class="p-2 rounded hover:bg-gray-200 text-gray-700"
      >
        <span v-if="tool.icon" v-html="tool.icon"></span>
        <span v-else>{{ tool.text }}</span>
      </button>
    </div>
    
    <!-- Область редактирования -->
    <div
      ref="editor"
      :contenteditable="true"
      class="editor-content w-full p-4 min-h-40 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-wood-500 focus:border-transparent"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @keydown="onKeyDown"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'TextEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      tools: [
        { command: 'bold', title: 'Полужирный', icon: '<strong>B</strong>' },
        { command: 'italic', title: 'Курсив', icon: '<em>I</em>' },
        { command: 'underline', title: 'Подчеркнутый', icon: '<u>U</u>' },
        { command: 'insertUnorderedList', title: 'Маркированный список', text: '• List' },
        { command: 'insertOrderedList', title: 'Нумерованный список', text: '1. List' },
        { command: 'formatBlock', title: 'Заголовок H2', text: 'H2', param: 'H2' },
        { command: 'formatBlock', title: 'Абзац', text: 'P', param: 'P' },
        { command: 'createLink', title: 'Вставить ссылку', text: '🔗 Link' },
        { command: 'removeFormat', title: 'Очистить форматирование', text: '⌫ Clear' }
      ],
      savedSelection: null,
      isUserTyping: false,
      ignoreNextUpdate: false
    }
  },
  methods: {
    // Сохраняем текущее выделение
    saveSelection() {
      const editor = this.$refs.editor;
      if (!editor) return;
      
      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;
      
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(editor);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      
      this.savedSelection = {
        start: preSelectionRange.toString().length,
        end: preSelectionRange.toString().length + range.toString().length
      };
    },
    
    // Восстанавливаем выделение
    restoreSelection() {
      if (!this.savedSelection) return;
      
      const editor = this.$refs.editor;
      if (!editor) return;
      
      const selection = window.getSelection();
      selection.removeAllRanges();
      
      let charIndex = 0;
      let range = document.createRange();
      range.setStart(editor, 0);
      range.collapse(true);
      
      const nodeStack = [editor];
      let node;
      let foundStart = false;
      let stop = false;
      
      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === Node.TEXT_NODE) {
          const nextCharIndex = charIndex + node.length;
          if (!foundStart && this.savedSelection.start >= charIndex && this.savedSelection.start <= nextCharIndex) {
            range.setStart(node, this.savedSelection.start - charIndex);
            foundStart = true;
          }
          if (foundStart && this.savedSelection.end >= charIndex && this.savedSelection.end <= nextCharIndex) {
            range.setEnd(node, this.savedSelection.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          let i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }
      
      selection.addRange(range);
    },
    
    executeCommand(command, param = null) {
      this.saveSelection();
      
      // Для команды создания ссылки запрашиваем URL
      if (command === 'createLink') {
        const url = prompt('Введите URL ссылки:', 'https://');
        if (url) {
          document.execCommand(command, false, url);
        }
      } else {
        document.execCommand(command, false, param);
      }
      
      this.updateValue();
      this.$nextTick(() => {
        this.restoreSelection();
        this.$refs.editor.focus();
      });
    },
    
    updateValue() {
      if (this.ignoreNextUpdate) {
        this.ignoreNextUpdate = false;
        return;
      }
      
      const newValue = this.$refs.editor.innerHTML;
      if (this.modelValue !== newValue) {
        this.$emit('update:modelValue', newValue);
      }
    },
    
    onInput() {
      if (this.isUserTyping) {
        this.updateValue();
      }
    },
    
    onBlur() {
      this.updateValue();
      this.isUserTyping = false;
    },
    
    onFocus() {
      this.isUserTyping = true;
    },
    
    onKeyDown() {
      this.isUserTyping = true;
    }
  },
  mounted() {
    // Устанавливаем начальное значение без сброса выделения
    this.ignoreNextUpdate = true;
    this.$refs.editor.innerHTML = this.modelValue;
    
    // Добавляем обработчик для вставки HTML
    this.$refs.editor.addEventListener('paste', (e) => {
      e.preventDefault();
      
      // Получаем текст из буфера обмена
      const text = e.clipboardData.getData('text/plain');
      
      // Вставляем как обычный текст
      document.execCommand('insertText', false, text);
      
      this.updateValue();
    });
  },
  watch: {
    modelValue: {
      handler(newValue) {
        // Если пользователь печатает, не обновляем содержимое
        if (this.isUserTyping) return;
        
        const editor = this.$refs.editor;
        if (!editor) return;
        
        // Сохраняем выделение только если содержимое действительно изменилось
        if (editor.innerHTML !== newValue) {
          this.saveSelection();
          editor.innerHTML = newValue;
          this.$nextTick(() => {
            this.restoreSelection();
          });
        }
      },
      immediate: false
    }
  },
  beforeUnmount() {
    // Очистка обработчиков
    if (this.$refs.editor) {
      this.$refs.editor.removeEventListener('paste', this.handlePaste);
    }
  }
}
</script>

<style scoped>
.text-editor {
  font-family: sans-serif;
}

.editor-content {
  white-space: pre-wrap;
  word-break: break-word;
  outline: none;
}

/* Стили для форматированного текста */
.editor-content strong {
  font-weight: bold;
}

.editor-content em {
  font-style: italic;
}

.editor-content u {
  text-decoration: underline;
}

.editor-content ul, .editor-content ol {
  margin-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.editor-content li {
  margin-bottom: 5px;
}

.editor-content h2 {
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  font-weight: bold;
}

.editor-content a {
  color: #4e5d51;
  text-decoration: underline;
}
</style>
