<template>
  <div>
    <h2>Список книг</h2>

    <!-- Сообщение об ошибке -->
    <p v-if="error" style="color: red;">{{ error }}</p>

    <!-- Список книг -->
    <ul v-if="books.length && !error">
      <li v-for="book in books" :key="book.id">
        {{ book.title }} — {{ book.author }}
        <button @click="markAsRead(book)" v-if="!isBookRead(book.id)">
          Добавить в прочитанные
        </button>
        <span v-else>Прочитано</span>
      </li>
    </ul>

    <!-- Сообщение, если книги не найдены -->
    <p v-if="!books.length && !error">Книги не найдены.</p>
  </div>
</template>

<script>
import { useBookStore } from '../stores/bookStore';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const bookStore = useBookStore();

    // Загрузка списка книг при монтировании компонента
    onMounted(() => {
      bookStore.fetchBooks();
      console.log('Загрузка книг начата...');
    });

    // Используем computed для явного отслеживания реактивных данных
    const books = computed(() => bookStore.books);
    const error = computed(() => bookStore.error);

    // Метод для добавления книги в прочитанные
    const markAsRead = (book) => {
      bookStore.addBookToRead(book);
      console.log(`Книга "${book.title}" добавлена в прочитанные.`);
    };

    return {
      books,
      error,
      markAsRead,
      isBookRead: bookStore.isBookRead,
    };
  },
};
</script>
