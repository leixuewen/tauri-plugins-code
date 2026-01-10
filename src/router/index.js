import {createRouter, createWebHistory} from 'vue-router'
import plugins from './plugins';
import tauriApi from './tauri-api';
import nativeJS from './native-js';

// // Automatically import files in the specified directory as pages
// let routes = import.meta.glob('../views/**/*.vue');
// console.log(routes);
// let pages = Object.keys(routes).map(path => {
//   let name = path.substring(path.lastIndexOf("/") + 1).replace(".vue", "");
//   // let name = path.match(/\.\/(.*)\.vue$/)[1];
//   return {
//     path: name.replace("views", ""),
//     component: routes[path],
//     name,
//   }
// });
// // add pages to routes 
// console.log(pages); 

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue'),
        },
        ...plugins,
        ...tauriApi,
        ...nativeJS,
    ],
})

export default router
