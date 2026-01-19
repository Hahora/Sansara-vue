<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Редактирование контента</h1>
          <p class="text-gray-600">Управление текстовым и медиа-контентом для разделов сайта</p>
        </div>

        <!-- Форма редактирования контента для мальчишников и девичников -->
        <div class="bg-white rounded-lg shadow p-6 space-y-8">
          <!-- Блок мальчишников -->
          <div class="bachelor-section">
            <h2 class="text-xl font-semibold mb-4">👔 Мальчишники</h2>

            <!-- Редактор текста для мальчишников -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Текстовое описание для мальчишников
              </label>
              <TextEditor
                v-model="bachelorContent.description"
                class="w-full"
              />
            </div>

            <!-- Компонент загрузки медиа для мальчишников -->
            <div class="mb-6">
              <MediaUploader
                v-model="bachelorContent.media"
              />
            </div>
          </div>

          <!-- Блок девичников -->
          <div class="bachelorette-section">
            <h2 class="text-xl font-semibold mb-4">👗 Девичники</h2>

            <!-- Редактор текста для девичников -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Текстовое описание для девичников
              </label>
              <TextEditor
                v-model="bacheloretteContent.description"
                class="w-full"
              />
            </div>

            <!-- Компонент загрузки медиа для девичников -->
            <div class="mb-6">
              <MediaUploader
                v-model="bacheloretteContent.media"
              />
            </div>
          </div>

          <!-- Кнопка сохранения -->
          <div class="flex justify-end">
            <button
              @click="saveContent"
              class="btn-primary px-6 py-2 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import TextEditor from '@/components/TextEditor.vue';
import MediaUploader from '@/components/MediaUploader.vue';
import { contentApi } from '@/utils/contentApi.js';

export default {
  name: 'ContentPage',
  components: {
    TextEditor,
    MediaUploader
  },
  setup() {
    // Структуры для хранения контента мальчишников и девичников
    const bachelorContent = reactive({
      description: '<p>Мужской праздник перед свадьбой в банном формате</p><p><strong>Что это за формат:</strong></p><p>Мужской праздник перед свадьбой в банном формате — сочетание традиций, отдыха и подготовки к новому этапу жизни.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча группы и знакомство с пространством</li><li>Банные ритуалы и парение</li><li>Отдых в зоне релакса</li><li>Чайная церемония</li><li>При желании — дополнительные программы</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Банщик-парильщик</li><li>Веники, полотенца, халаты</li><li>Чай и легкие закуски</li><li>3-4 часа программы</li></ul>',
      media: {
        photos: [],
        videos: []
      }
    });

    const bacheloretteContent = reactive({
      description: '<p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Что это за формат:</strong></p><p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча и погружение в атмосферу</li><li>Мягкое парение с травами</li><li>СПА-процедуры и уход</li><li>Фотозона</li><li>Чайная церемония с десертами</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Мастер парения</li><li>Банные принадлежности</li><li>Уходовые маски и скрабы</li><li>Чай, фрукты, десерты</li><li>3-4 часа программы</li></ul>',
      media: {
        photos: [],
        videos: []
      }
    });

    const loadContent = async () => {
      try {
        // Загружаем контент для мальчишников
        try {
          const bachelorData = await contentApi.getContent('bachelor');
          if (bachelorData) {
            bachelorContent.description = bachelorData.description || bachelorContent.description;
            bachelorContent.media = bachelorData.media || bachelorContent.media;
          }
        } catch (bachelorError) {
          console.error('Ошибка загрузки контента для мальчишников:', bachelorError);
        }

        // Загружаем контент для девичников
        try {
          const bacheloretteData = await contentApi.getContent('bachelorette');
          if (bacheloretteData) {
            bacheloretteContent.description = bacheloretteData.description || bacheloretteContent.description;
            bacheloretteContent.media = bacheloretteData.media || bacheloretteContent.media;
          }
        } catch (bacheloretteError) {
          console.error('Ошибка загрузки контента для девичников:', bacheloretteError);
        }
      } catch (error) {
        console.error('Ошибка загрузки контента:', error);
      }
    };

    const saveContent = async () => {
      try {
        // Сохраняем контент для мальчишников
        await contentApi.saveContent('bachelor', {
          description: bachelorContent.description,
          media: bachelorContent.media
        });

        // Сохраняем контент для девичников
        await contentApi.saveContent('bachelorette', {
          description: bacheloretteContent.description,
          media: bacheloretteContent.media
        });

        alert('Контент для мальчишников и девичников успешно сохранен!');
      } catch (error) {
        console.error('Ошибка сохранения контента:', error);
        alert(`Ошибка при сохранении контента: ${error.message}`);
      }
    };

    onMounted(async () => {
      // Загружаем контент при монтировании компонента
      await loadContent();
    });

    return {
      bachelorContent,
      bacheloretteContent,
      saveContent
    };
  }
}
</script>