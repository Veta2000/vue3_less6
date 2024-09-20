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
  import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore.js';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const userStore = useUserStore();
      const router = useRouter();
  
      const users = [
        {
          login: "user" , 
          password: "123",
        }
      ];
      
      const loginUser = () => {
        const user = users.find((user) =>username.value === user.login && password.value === user.password)
        if ( user ) {
          userStore.login({ username: user.login });
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
  