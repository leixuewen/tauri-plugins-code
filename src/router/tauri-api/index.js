export default [
    {
        path: '/apps',
        name: "Apps",
        component: () => import('@/views/tauri-api/Apps.vue'),
        meta: {
            description: "tauri-api/app",
        }
    },
]