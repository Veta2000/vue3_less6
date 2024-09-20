<template>
  <div>
    <h2>Список книг</h2>

    <p v-if="error" style="color: red;">{{ error }}</p>

    <ul v-if="books.length && !error">
      <li v-for="book in books" :key="book.id">
        {{ book.title }} — {{ book.author }}
        <button @click="markAsRead(book)" v-if="!isBookRead(book.id)">
          Добавить в прочитанные
        </button>
        <span v-else>Прочитано</span>
      </li>
    </ul>

    <p v-if="!books.length && !error">Книги не найдены.</p>

    <!-- Пагинация -->
    <div v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Вперед</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useBookStore } from '../stores/bookStore.js';

export default {
  setup() {
    const bookStore = useBookStore();

    onMounted(() => {
      bookStore.fetchBooks(); 
    });

    const books = computed(() => bookStore.books);
    const error = computed(() => bookStore.error);
    const currentPage = computed(() => bookStore.currentPage);
    const totalPages = computed(() => bookStore.totalPages);

    const markAsRead = (book) => {
      bookStore.addBookToRead(book);
      console.log(`Книга "${book.title}" добавлена в прочитанные.`);
    };

    const prevPage = () => {
      if (bookStore.currentPage > 1) {
        bookStore.fetchBooks(bookStore.currentPage - 1); // 
      }
    };

    const nextPage = () => {
      if (bookStore.currentPage < bookStore.totalPages) {
        bookStore.fetchBooks(bookStore.currentPage + 1); // 
      }
    };

    return {
      books,
      error,
      currentPage,
      totalPages,
      markAsRead,
      prevPage,
      nextPage,
      isBookRead: bookStore.isBookRead,
    };
  },
};
</script>
