import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore.js';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    readBooks: [],
    loading: false,
    error: null,
    currentPage: 1, 
    totalPages: 0,  
    pageSize: 10,   
  }),
  actions: {
    async fetchBooks(page = 1) {
      this.loading = true;
      this.error = null;
      this.currentPage = page;
      console.log('Загрузка книг начата...');

      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=science&page=${this.currentPage}&limit=${this.pageSize}`
        );
        console.log('Ответ от API:', response);

        if (response && response.data && response.data.docs) {
          this.books = response.data.docs.map(book => ({
            id: book.key,
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          }));
          this.totalPages = Math.ceil(response.data.numFound / this.pageSize);
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
    isBookRead: (state) => (bookId, userId) => {
      return state.readBooks.some(book => book.id === bookId && book.userId === userId);
    },
  },
});
