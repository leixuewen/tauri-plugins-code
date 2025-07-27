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
        path: '/path',
        name: "Path",
        component: () => import('@/views/tauri-api/Path.vue'),
    },
    {
        path: '/tray',
        name: "Tray",
        component: () => import('@/views/tauri-api/Tray.vue'),
    },
].map(v => { v.meta = { description: 'tauri-api' + v.path }; return v; })