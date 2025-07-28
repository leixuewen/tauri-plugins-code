export default [
    {
        path: '/apps',
        name: "Apps",
        component: () => import('@/views/tauri-api/Apps.vue'),
    },
    {
        path: '/core',
        name: "Core",
        component: () => import('@/views/tauri-api/Core.vue'),
    },
    {
        path: '/dpi',
        name: "Dpi",
        component: () => import('@/views/tauri-api/Dpi.vue'),
    },
    {
        path: '/event',
        name: "Event",
        component: () => import('@/views/tauri-api/Event.vue'),
    },
    {
        path: '/menu',
        name: "Menu",
        component: () => import('@/views/tauri-api/Menu.vue'),
    },
    {
        path: '/path',
        name: "Path",
        component: () => import('@/views/tauri-api/Path.vue'),
    },
    {
        path: '/tray',
        name: "Tray",
        component: () => import('@/views/tauri-api/Tray.vue'),
    },
    {
        path: '/webview',
        name: "Webview",
        component: () => import('@/views/tauri-api/Webview.vue'),
    },
    {
        path: '/webviewWindow',
        name: "WebviewWindow",
        component: () => import('@/views/tauri-api/WebviewWindow.vue'),
    },
    {
        path: '/window',
        name: "Window",
        component: () => import('@/views/tauri-api/Window.vue'),
    },
].map(v => { v.meta = { description: 'tauri-api' + v.path }; return v; })