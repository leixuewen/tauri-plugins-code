import desktop from "./desktop"
import mobile from "./mobile"

let pages = [];
// console.log('VITE_desktop', !!import.meta.env.VITE_desktop);
// console.log('VITE_mobile', !!import.meta.env.VITE_mobile);

if (!!import.meta.env.VITE_desktop) {
    pages.push(...desktop);
}

if (!!import.meta.env.VITE_mobile) {
    pages.push(...mobile);
}

export default [
    ...pages,
    {
        path: '/clipboard',
        name: "Clipboard",
        component: () => import('@/views/plugins/Clipboard.vue'),
        meta: {
            description: "Read and write to the system clipboard using the clipboard plugin.",
        }
    },
    {
        path: '/dialog',
        name: "Dialog",
        component: () => import('@/views/plugins/Dialog.vue'),
        meta: {
            description: "Native system dialogs for opening and saving files along with message dialogs.",
        }
    },
    {
        path: '/fileSystem',
        name: "File System",
        component: () => import('@/views/plugins/FileSystem.vue'),
        meta: {
            description: "Access the file system.",
        }
    },
    {
        path: '/httpClient',
        name: "HTTP Client",
        component: () => import('@/views/plugins/HttpClient.vue'),
        meta: {
            description: "Make HTTP requests with the http plugin.",
        }
    },
    {
        path: '/logging',
        name: "Logging",
        component: () => import('@/views/plugins/Logging.vue'),
        meta: {
            description: "Configurable logging for your Tauri app.",
        }
    },
    {
        path: '/notification',
        name: "Notification",
        component: () => import('@/views/plugins/Notification.vue'),
        meta: {
            description: "Send native notifications to your user using the notification plugin.",
        }
    },
    {
        path: '/opener',
        name: "Opener",
        component: () => import('@/views/plugins/Opener.vue'),
        meta: {
            description: "This plugin allows you to open files and URLs in a specified, or the default, application. It also supports “revealing” files in the system’s file explorer.",
        }
    },
    {
        path: '/osInfo',
        name: "OsInfo",
        component: () => import('@/views/plugins/OsInfo.vue'),
        meta: {
            description: "Read information about the operating system using the OS Information plugin.",
        }
    },
    {
        path: '/sql',
        name: "SQL",
        component: () => import('@/views/plugins/SQL.vue'),
        meta: {
            description: "Plugin providing an interface for the frontend to communicate with SQL databases through sqlx. It supports the SQLite, MySQL and PostgreSQL drivers, enabled by a Cargo feature.",
        }
    },
    {
        path: '/store',
        name: "Store",
        component: () => import('@/views/plugins/Store.vue'),
        meta: {
            description: "This plugin provides a persistent key-value store. This is one of many options to handle state in your application.",
        }
    },
    {
        path: '/upload',
        name: "Upload",
        component: () => import('@/views/plugins/Upload.vue'),
        meta: {
            description: "Upload files from disk to a remote server over HTTP. Download files from a remote HTTP server to disk.",
        }
    },
    {
        path: '/websocket',
        name: "Websocket",
        component: () => import('@/views/plugins/Websocket.vue'),
        meta: {
            description: "Open a WebSocket connection using a Rust client in JavaScript.",
        }
    },
];