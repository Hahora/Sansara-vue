// src/utils/contentApi.js
import { useAppStore } from '@/stores/appStore';

// Сервис для работы с контентом
export const contentApi = {
  // Получить контент для раздела
  async getContent(section) {
    try {
      // В реальной реализации здесь будет запрос к API
      // return await fetch(`/api/content/${section}`).then(res => res.json());
      
      // Пока используем локальное хранилище
      const store = useAppStore();
      if (store.contentData && store.contentData[section]) {
        return store.contentData[section];
      }
      
      // Возвращаем стандартные значения, если нет данных
      return {
        description: '',
        media: {
          photos: [],
          videos: []
        }
      };
    } catch (error) {
      console.error('Ошибка получения контента:', error);
      throw error;
    }
  },

  // Сохранить контент для раздела
  async saveContent(section, content) {
    try {
      // В реальной реализации здесь будет POST/PUT запрос к API
      // return await fetch(`/api/content/${section}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(content),
      // }).then(res => res.json());
      
      // Пока сохраняем в локальное хранилище
      const store = useAppStore();
      if (!store.contentData) {
        store.contentData = {};
      }
      store.contentData[section] = content;
      
      console.log(`Контент для раздела ${section} успешно сохранен`, content);
      return content;
    } catch (error) {
      console.error('Ошибка сохранения контента:', error);
      throw error;
    }
  },

  // Загрузить файл (фото или видео)
  async uploadFile(file, type = 'media') {
    try {
      // В реальной реализации здесь будет загрузка файла на сервер
      // Создаем FormData и отправляем файл
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('type', type);
      //
      // return await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // }).then(res => res.json());
      
      // Пока возвращаем URL для предварительного просмотра
      return {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type
      };
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      throw error;
    }
  }
};