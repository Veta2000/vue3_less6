import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore'; 

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [], 
    readBooks: [], 
    loading: false, 
    error: null, 
  }),
  actions: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;
      console.log('Загрузка книг начата...'); 
      try {
        const response = await axios.get(
          'https://openlibrary.org/search.json?q=science'
        );
        console.log('Ответ от API:', response); 

        
        if (response && response.data && response.data.docs) {
          this.books = response.data.docs.map(book => ({
            id: book.key,
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          }));
          console.log('Книги успешно загружены:', this.books); 
        } else {
          this.error = 'Некорректный формат данных от API';
        }
      } catch (error) {
        this.error = 'Ошибка при загрузке книг: ' + error.message;
        console.error('Ошибка:', error); 
      } finally {
        this.loading = false;
      }
    },

    addBookToRead(book) {
      const userStore = useUserStore(); 

      if (!this.readBooks.find(b => b.id === book.id && b.userId === userStore.user.id)) {
        this.readBooks.push({
          ...book,
          userId: userStore.user.id,
        });
      }
    },
  },
  getters: {
    // Проверка, прочитана ли книга
    isBookRead: (state) => (bookId, userId) => {
      return state.readBooks.some(book => book.id === bookId && book.userId === userId);
    },
  },
});
