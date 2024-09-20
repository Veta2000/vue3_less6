<template>
    <div>
      <h2>Вход</h2>
      <form @submit.prevent="loginUser">
        <label for="username">Имя пользователя:</label>
        <input type="text" v-model="username" required />
  
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Войти</button>
      </form>
  
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/userStore';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const userStore = useUserStore();
      const router = useRouter();
  
      const loginUser = () => {
        
        if (username.value === 'user' && password.value === '123') {
          userStore.login({ username: username.value });
          router.push('/');
        } else {
          errorMessage.value = 'Неверное имя пользователя или пароль';
        }
      };
  
      return {
        username,
        password,
        errorMessage,
        loginUser,
      };
    },
  };
  </script>
  