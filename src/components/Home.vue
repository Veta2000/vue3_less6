<template>
  <div>
    <h1>Добро пожаловать в книжное приложение!</h1>
    <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
    <router-link v-else to="/profile">Мой профиль</router-link>
    <router-link to="/books">Перейти к списку книг</router-link>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      isAuthenticated: userStore.isAuthenticated,
    };
  },
};
</script>
