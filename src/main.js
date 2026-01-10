// #if VITE_mobile_android || VITE_mobile_ios
// #define VITE_mobile
// #endif

import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
    .use(router)
    .mount('#app');