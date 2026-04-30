import {createApp} from "vue";
import App from "./App.vue";
import {routes} from 'vue-router/auto-routes';
import {createRouter, createWebHashHistory} from 'vue-router';

createApp(App)
    .use(createRouter({history: createWebHashHistory(), routes,}))
    .mount('#app');

// #if DEV
console.log(routes);
// #endif
