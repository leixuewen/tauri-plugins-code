import {createApp} from "vue";
import App from "./App.vue";
import {routes} from 'vue-router/auto-routes';
import {createRouter, createWebHistory} from 'vue-router';

createApp(App)
    .use(createRouter({history: createWebHistory(), routes,}))
    .mount('#app');

// #if DEV
console.log(routes);
// #endif
