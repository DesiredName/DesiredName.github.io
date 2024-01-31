import './css/main.scss';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import KnownPages from './utils/routes';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: KnownPages,
});

createApp(App).use(router).mount('#app');
