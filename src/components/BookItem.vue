<template>
    <div>
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <button @click="markAsRead">Отметить как прочитанную</button>
    </div>
  </template>
  
  <script>
import { useBookStore } from '../stores/bookStore.js';

  
  export default {
    props: ['book'],
    setup(props) {
      const bookStore = useBookStore();
  
      const markAsRead = () => {
        bookStore.markAsRead(props.book);
      };
  
      return {
        markAsRead,
      };
    },
  };
  </script>
  