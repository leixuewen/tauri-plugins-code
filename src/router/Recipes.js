import { type } from '@tauri-apps/plugin-os';
const osType = type();

export default [
  {
    path: '/autostart',
    name: 'Autostart',
    component: () => import('../views/plugins/Autostart.vue'),
    meta: {
      description: "Automatically launch your application at system startup.",
      platform: ['windows', 'linux', 'macos'],
    }
  },
  {
    path: '/barcodeScanner',
    name: 'Barcode Scanner',
    component: () => import('../views/plugins/BarcodeScanner.vue'),
    meta: {
      description: "Allows your mobile application to use the camera to scan QR codes, EAN-13 and other kinds of barcodes.",
      platform: ['android', 'ios'],
    }
  },
  {
    path: '/biometric',
    name: "Biometric",
    component: () => import('../views/plugins/Biometric.vue'),
    meta: {
      description: "Prompt the user for biometric authentication on Android and iOS.",
      platform: ['android', 'ios'],
    }
  },
  {
    path: '/cli',
    name: "Command Line Interface (CLI)",
    component: () => import('../views/plugins/CLI.vue'),
    meta: {
      description: "Tauri enables your app to have a CLI through clap, a robust command line argument parser. With a simple CLI definition in your tauri.conf.json file, you can define your interface and read its argument matches map on JavaScript and/or Rust.",
      platform: ['windows', 'linux', 'macos'],
    }
  },
  {
    path: '/clipboard',
    name: "Clipboard",
    component: () => import('../views/plugins/Clipboard.vue'),
    meta: {
      description: "Read and write to the system clipboard using the clipboard plugin.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  // {
  //   title: "Deep Linking",
  //   description: "Set your Tauri application as the default handler for an URL.",
  //   platform: ['windows', 'linux', 'macos', 'android', 'ios'],
  // },
  {
    path: '/dialog',
    name: "Dialog",
    component: () => import('../views/plugins/Dialog.vue'),
    meta: {
      description: "Native system dialogs for opening and saving files along with message dialogs.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  {
    path: '/fileSystem',
    name: "File System",
    component: () => import('../views/plugins/FileSystem.vue'),
    meta: {
      description: "Access the file system.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  {
    path: '/globalShortcut',
    name: "Global Shortcut",
    component: () => import('../views/plugins/GlobalShortcut.vue'),
    meta: {
      description: "Register global shortcuts.",
      platform: ['windows', 'linux', 'macos'],
    }
  },
  {
    path: '/httpClient',
    name: "HTTP Client",
    component: () => import('../views/plugins/HttpClient.vue'),
    meta: {
      description: "Make HTTP requests with the http plugin.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  // {
  //   title: "Localhost",
  //   description: "Expose your app’s assets through a localhost server instead of the default custom protocol.",
  //   platform: ['windows', 'linux', 'macos'],
  // },
  {
    path: '/logging',
    name: "Logging",
    component: () => import('../views/plugins/Logging.vue'),
    meta: {
      description: "Configurable logging for your Tauri app.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  {
    path: '/nfc',
    name: "NFC",
    component: () => import('../views/plugins/NFC.vue'),
    meta: {
      description: "Read and write NFC tags on Android and iOS.",
      platform: ['android', 'ios'],
    }
  },
  {
    path: '/notification',
    name: "notification",
    component: () => import('../views/plugins/Notification.vue'),
    meta: {
      description: "Send native notifications to your user using the notification plugin.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
  {
    path: '/opener',
    name: "opener",
    component: () => import('../views/plugins/Opener.vue'),
    meta: {
      description: "This plugin allows you to open files and URLs in a specified, or the default, application. It also supports “revealing” files in the system’s file explorer.",
      platform: ['windows', 'linux', 'macos', 'android', 'ios'],
    }
  },
].filter(f => f.meta.platform.includes(osType))