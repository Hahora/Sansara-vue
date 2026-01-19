<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Мальчишники и девичники</h1>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4e5d51]"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <!-- Мальчишники -->
      <div class="card">
        <h2 class="section-title">👔 Мальчишники</h2>
        <p class="text-black text-sm mb-3">Мужской праздник перед свадьбой в банном формате</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3" v-html="getFormattedContent('bachelor')">
        </div>

        <!-- Отображение фото и видео для мальчишников -->
        <div v-if="bachelorMedia && (bachelorMedia.photos.length > 0 || bachelorMedia.videos.length > 0)" class="mb-4">
          <!-- Фото -->
          <div v-if="bachelorMedia.photos && bachelorMedia.photos.length > 0" class="mb-4">
            <h3 class="font-semibold mb-2">Фото:</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              <img 
                v-for="(photo, index) in bachelorMedia.photos" 
                :key="'photo-' + index"
                :src="photo.url" 
                :alt="photo.alt || 'Фото мальчишника'"
                class="w-full h-24 object-cover rounded"
              />
            </div>
          </div>

          <!-- Видео -->
          <div v-if="bachelorMedia.videos && bachelorMedia.videos.length > 0">
            <h3 class="font-semibold mb-2">Видео:</h3>
            <div class="space-y-2">
              <video 
                v-for="(video, index) in bachelorMedia.videos" 
                :key="'video-' + index"
                :src="video.url" 
                controls
                class="w-full max-w-md"
              />
            </div>
          </div>
        </div>

        <!-- Ищем программу для мальчишников -->
        <div v-if="bachelorProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: bachelorProgram.id,
                programType: bachelorProgram.program_type,
                eventId: bachelorProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Забронировать
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'bachelor' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Забронировать
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
        </div>
      </div>

      <!-- Девичники -->
      <div class="card">
        <h2 class="section-title">👗 Девичники</h2>
        <p class="text-black text-sm mb-3">Женский праздник в атмосфере заботы и красоты</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3" v-html="getFormattedContent('bachelorette')">
        </div>

        <!-- Отображение фото и видео для девичников -->
        <div v-if="bacheloretteMedia && (bacheloretteMedia.photos.length > 0 || bacheloretteMedia.videos.length > 0)" class="mb-4">
          <!-- Фото -->
          <div v-if="bacheloretteMedia.photos && bacheloretteMedia.photos.length > 0" class="mb-4">
            <h3 class="font-semibold mb-2">Фото:</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              <img 
                v-for="(photo, index) in bacheloretteMedia.photos" 
                :key="'photo-' + index"
                :src="photo.url" 
                :alt="photo.alt || 'Фото девичника'"
                class="w-full h-24 object-cover rounded"
              />
            </div>
          </div>

          <!-- Видео -->
          <div v-if="bacheloretteMedia.videos && bacheloretteMedia.videos.length > 0">
            <h3 class="font-semibold mb-2">Видео:</h3>
            <div class="space-y-2">
              <video 
                v-for="(video, index) in bacheloretteMedia.videos" 
                :key="'video-' + index"
                :src="video.url" 
                controls
                class="w-full max-w-md"
              />
            </div>
          </div>
        </div>

        <!-- Ищем программу для девичников -->
        <div v-if="bacheloretteProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: bacheloretteProgram.id,
                programType: bacheloretteProgram.program_type,
                eventId: bacheloretteProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Забронировать
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'bachelorette' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Забронировать
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { contentApi } from '@/utils/contentApi.js';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'BachelorPage',
  setup() {
    const store = useAppStore();
    
    // Реактивные переменные для хранения контента
    const bachelorContent = ref(null);
    const bacheloretteContent = ref(null);
    const bachelorMedia = ref({ photos: [], videos: [] });
    const bacheloretteMedia = ref({ photos: [], videos: [] });
    const isLoading = ref(false);
    const error = ref(null);

    // Находим программу для мальчишников
    const bachelorProgram = ref(null);
    // Находим программу для девичников
    const bacheloretteProgram = ref(null);

    // Загрузка контента напрямую из API
    const loadContent = async () => {
      try {
        isLoading.value = true;
        
        // Загружаем контент для мальчишников
        try {
          const bachelorData = await contentApi.getContent('bachelor');
          if (bachelorData) {
            bachelorContent.value = bachelorData.description;
            bachelorMedia.value = bachelorData.media || { photos: [], videos: [] };
          }
        } catch (bachelorError) {
          console.error('Ошибка загрузки контента для мальчишников:', bachelorError);
          // Устанавливаем стандартный контент при ошибке
          bachelorContent.value = '<p>Мужской праздник перед свадьбой в банном формате</p><p><strong>Что это за формат:</strong></p><p>Мужской праздник перед свадьбой в банном формате — сочетание традиций, отдыха и подготовки к новому этапу жизни.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча группы и знакомство с пространством</li><li>Банные ритуалы и парение</li><li>Отдых в зоне релакса</li><li>Чайная церемония</li><li>При желании — дополнительные программы</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Банщик-парильщик</li><li>Веники, полотенца, халаты</li><li>Чай и легкие закуски</li><li>3-4 часа программы</li></ul>';
          bachelorMedia.value = { photos: [], videos: [] };
        }

        // Загружаем контент для девичников
        try {
          const bacheloretteData = await contentApi.getContent('bachelorette');
          if (bacheloretteData) {
            bacheloretteContent.value = bacheloretteData.description;
            bacheloretteMedia.value = bacheloretteData.media || { photos: [], videos: [] };
          }
        } catch (bacheloretteError) {
          console.error('Ошибка загрузки контента для девичников:', bacheloretteError);
          // Устанавливаем стандартный контент при ошибке
          bacheloretteContent.value = '<p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Что это за формат:</strong></p><p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча и погружение в атмосферу</li><li>Мягкое парение с травами</li><li>СПА-процедуры и уход</li><li>Фотозона</li><li>Чайная церемония с десертами</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Мастер парения</li><li>Банные принадлежности</li><li>Уходовые маски и скрабы</li><li>Чай, фрукты, десерты</li><li>3-4 часа программы</li></ul>';
          bacheloretteMedia.value = { photos: [], videos: [] };
        }
      } catch (err) {
        error.value = err.message;
        console.error('Ошибка загрузки контента:', err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      // Загружаем программы, если они еще не загружены
      if (!store.programsLoaded && store.loadPrograms) {
        await store.loadPrograms();
      }

      // Обновляем ссылки на программы из хранилища
      bachelorProgram.value = store.programs.find(p =>
        p.program_type === 'bachelor' ||
        p.name.toLowerCase().includes('мальчишник') ||
        p.name.toLowerCase().includes('bachelor')
      ) || null;

      bacheloretteProgram.value = store.programs.find(p =>
        p.program_type === 'bachelorette' ||
        p.name.toLowerCase().includes('девичник') ||
        p.name.toLowerCase().includes('bachelorette')
      ) || null;

      // Загружаем контент для мальчишников и девичников
      await loadContent();
    });

    return {
      bachelorContent,
      bacheloretteContent,
      bachelorMedia,
      bacheloretteMedia,
      isLoading,
      error,
      bachelorProgram,
      bacheloretteProgram,
      loadContent
    };
  },
  
  computed: {
    ...mapState(useAppStore, ['programs', 'programsLoaded'])
  },
  
  methods: {
    ...mapActions(useAppStore, ['loadPrograms']),
    
    // Метод для форматирования контента
    getFormattedContent(type) {
      let content = '';
      
      if (type === 'bachelor') {
        // Используем реактивное значение из setup
        if (this.bachelorContent) {
          content = this.bachelorContent;
        } else {
          // Возвращаем стандартный текст
          content = '<p>Мужской праздник перед свадьбой в банном формате</p><p><strong>Что это за формат:</strong></p><p>Мужской праздник перед свадьбой в банном формате — сочетание традиций, отдыха и подготовки к новому этапу жизни.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча группы и знакомство с пространством</li><li>Банные ритуалы и парение</li><li>Отдых в зоне релакса</li><li>Чайная церемония</li><li>При желании — дополнительные программы</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Банщик-парильщик</li><li>Веники, полотенца, халаты</li><li>Чай и легкие закуски</li><li>3-4 часа программы</li></ul>';
        }
      } else {
        // Для девичников
        if (this.bacheloretteContent) {
          content = this.bacheloretteContent;
        } else {
          // Возвращаем стандартный текст
          content = '<p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Что это за формат:</strong></p><p>Женский праздник в атмосфере заботы и красоты — идеальный способ провести время перед свадьбой с подругами.</p><p><strong>Как проходит:</strong></p><ul><li>Встреча и погружение в атмосферу</li><li>Мягкое парение с травами</li><li>СПА-процедуры и уход</li><li>Фотозона</li><li>Чайная церемония с десертами</li></ul><p><strong>Что включает:</strong></p><ul><li>Приватная аренда пространства</li><li>Мастер парения</li><li>Банные принадлежности</li><li>Уходовые маски и скрабы</li><li>Чай, фрукты, десерты</li><li>3-4 часа программы</li></ul>';
        }
      }
      
      // Возвращаем отформатированный контент
      return content;
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  }
}
</script>