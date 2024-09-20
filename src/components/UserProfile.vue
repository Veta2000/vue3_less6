<template>
  <div>
    <h2>Профиль пользователя</h2>
    <p>Имя пользователя: {{ user?.name }}</p>
    
    <h3>Прочитанные книги</h3>
    
    <p v-if="readBooks.length === 0">У вас еще нет прочитанных книг.</p>
    <ul v-else>
      <li v-for="book in readBooks" :key="book.id">{{ book.title }}</li>
    </ul>

    <button @click="logoutUser">Выйти</button>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import { useBookStore } from '../stores/bookStore';

export default {
  setup() {
    const userStore = useUserStore();
    const bookStore = useBookStore();

    const logoutUser = () => {
      userStore.logout();
    };

    return {
      user: userStore.user,
    
      readBooks: bookStore.readBooks.filter(book => book.userId === userStore.user.id),
      logoutUser,
    };
  },
};
</script>
