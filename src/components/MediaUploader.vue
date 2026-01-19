<template>
  <div class="media-uploader">
    <!-- Загрузка фото -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Фотографии
      </label>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handlePhotoUpload"
          class="hidden"
          ref="photoInput"
        />
        <button
          @click="$refs.photoInput.click()"
          class="btn-primary inline-flex items-center px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Загрузить фотографии
        </button>
        <p class="mt-2 text-sm text-gray-500">Выберите одно или несколько изображений для загрузки</p>
        
        <!-- Предварительный просмотр фото -->
        <div v-if="photos.length > 0" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div 
            v-for="(photo, index) in photos" 
            :key="index"
            class="relative group"
          >
            <img 
              :src="photo.url" 
              :alt="photo.alt || 'Фото'"
              class="w-full h-32 object-cover rounded-lg"
            />
            <button
              @click="removePhoto(index)"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Загрузка видео -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Видео
      </label>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="video/*"
          multiple
          @change="handleVideoUpload"
          class="hidden"
          ref="videoInput"
        />
        <button
          @click="$refs.videoInput.click()"
          class="btn-primary inline-flex items-center px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Загрузить видео
        </button>
        <p class="mt-2 text-sm text-gray-500">Выберите одно или несколько видео для загрузки</p>
        
        <!-- Предварительный просмотр видео -->
        <div v-if="videos.length > 0" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            v-for="(video, index) in videos" 
            :key="index"
            class="relative group"
          >
            <video 
              :src="video.url" 
              controls
              class="w-full h-48 object-contain rounded-lg"
            />
            <button
              @click="removeVideo(index)"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaUploader',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        photos: [],
        videos: []
      })
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      photos: [],
      videos: []
    }
  },
  methods: {
    handlePhotoUpload(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.photos.push({
              url: e.target.result,
              alt: file.name,
              file: file
            });
            this.updateValue();
          };
          reader.readAsDataURL(file);
        }
      });
    },
    
    handleVideoUpload(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        if (file.type.startsWith('video/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.videos.push({
              url: e.target.result,
              title: file.name,
              file: file
            });
            this.updateValue();
          };
          reader.readAsDataURL(file);
        }
      });
    },
    
    removePhoto(index) {
      this.photos.splice(index, 1);
      this.updateValue();
    },
    
    removeVideo(index) {
      this.videos.splice(index, 1);
      this.updateValue();
    },
    
    updateValue() {
      this.$emit('update:modelValue', {
        photos: [...this.photos],
        videos: [...this.videos]
      });
    }
  },
  mounted() {
    // Устанавливаем начальные значения
    this.photos = [...this.modelValue.photos];
    this.videos = [...this.modelValue.videos];
  },
  watch: {
    modelValue: {
      handler(newValue) {
        if (JSON.stringify(this.photos) !== JSON.stringify(newValue.photos)) {
          this.photos = [...newValue.photos];
        }
        if (JSON.stringify(this.videos) !== JSON.stringify(newValue.videos)) {
          this.videos = [...newValue.videos];
        }
      },
      deep: true
    }
  }
}
</script>