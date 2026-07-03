import {defineConfig} from "vite";
import components from 'unplugin-vue-components/vite';
import {VarletUIResolver} from 'unplugin-vue-components/resolvers';
import vue from "@vitejs/plugin-vue";
import vueRouter from 'vue-router/vite';
import vueDevTools from 'vite-plugin-vue-devtools'
import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'

const host = process.env.TAURI_DEV_HOST;

// 排除特定名称的路由文件
function exclude() {
    let list = [];
    if (process.env.VITE_desktop) {
        list.push("**/*!mobile.vue");
        list.push("**/*!mobile_android.vue");
        list.push("**/*!mobile_ios.vue");
        if (process.env.VITE_desktop_windows) {
            list.push("**/*!desktop_linux.vue");
            list.push("**/*!desktop_macos.vue");
        }
        if (process.env.VITE_desktop_linux) {
            list.push("**/*!desktop_windows.vue");
            list.push("**/*!desktop_macos.vue");
        }
        if (process.env.VITE_desktop_macos) {
            list.push("**/*!desktop_windows.vue");
            list.push("**/*!desktop_linux.vue");
        }
    }
    if (process.env.VITE_mobile) {
        list.push("**/*!desktop.vue");
        list.push("**/*!desktop_windows.vue");
        list.push("**/*!desktop_linux.vue");
        list.push("**/*!desktop_macos.vue");
        if (process.env.VITE_mobile_android) {
            list.push("**/*!mobile_ios.vue");
        }
        if (process.env.VITE_mobile_ios) {
            list.push("**/*!mobile_android.vue");
        }
    }
    // console.log(list);
    return list;
}

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        PreprocessorDirectives(),
        vueRouter({routesFolder: "src/views", exclude: exclude(), dts: false,}),
        vue(),
        // vueDevTools(),
        components({
            dts: false,
            resolvers: [VarletUIResolver()]
        }),
    ],
    base: "./",

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
