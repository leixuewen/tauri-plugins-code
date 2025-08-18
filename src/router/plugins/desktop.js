export default [
    {
        path: '/autostart',
        name: 'Autostart',
        component: () => import('@/views/plugins/Autostart.vue'),
        meta: {
            description: "Automatically launch your application at system startup.",
        }
    },
    {
        path: '/cli',
        name: "Command Line Interface (CLI)",
        component: () => import('@/views/plugins/CLI.vue'),
        meta: {
            description: "Tauri enables your app to have a CLI through clap, a robust command line argument parser. With a simple CLI definition in your tauri.conf.json file, you can define your interface and read its argument matches map on JavaScript and/or Rust.",
        }
    },
    {
        path: '/globalShortcut',
        name: "Global Shortcut",
        component: () => import('@/views/plugins/GlobalShortcut.vue'),
        meta: {
            description: "Register global shortcuts.",
        }
    },
    {
        path: '/positioner',
        name: "Positioner",
        component: () => import('@/views/plugins/Positioner.vue'),
        meta: {
            description: "Position your windows at well-known locations.",
        }
    },
    {
        path: '/process',
        name: "Process",
        component: () => import('@/views/plugins/Process.vue'),
        meta: {
            description: "This plugin provides APIs to access the current process.",
        }
    },
    {
        path: '/shell',
        name: "Shell",
        component: () => import('@/views/plugins/Shell.vue'),
        meta: {
            description: "Access the system shell. Allows you to spawn child processes.",
        }
    },
    {
        path: '/updater',
        name: "Updater",
        component: () => import('@/views/plugins/Updater.vue'),
        meta: {
            description: "This plugin provides a persistent key-value store. This is one of many options to handle state in your application.",
        }
    },
    {
        path: '/windowState',
        name: "WindowState",
        component: () => import('@/views/plugins/WindowState.vue'),
        meta: {
            description: "Save window positions and sizes and restore them when the app is reopened.",
        }
    },
    {
        path: '/screenshots',
        name: "Screenshots",
        component: () => import('@/views/plugins/Screenshots.vue'),
        meta: {
            description: "Get screenshots of windows and monitors.",
        }
    },
    {
        path: '/system-info',
        name: "SystemInfo",
        component: () => import('@/views/plugins/SystemInfo.vue'),
        meta: {
            description: "A tauri plugin for retrieving system info",
        }
    },
]