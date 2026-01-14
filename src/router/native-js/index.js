export default [
    {
        path: '/info',
        name: "Info",
        component: () => import('../../views/native-js/Info.vue'),
    },
    {
        path: '/geolocatons',
        name: "Geolocaton",
        component: () => import('../../views/native-js/Geolocaton.vue'),
    },
    {
        path: '/queryLocalFonts',
        name: "QueryLocalFonts",
        component: () => import('../../views/native-js/QueryLocalFonts.vue'),
    },
    {
        path: '/vibrate',
        name: "Vibrate",
        component: () => import('../../views/native-js/Vibrate.vue'),
    },
    {
        path: '/battery',
        name: "Battery",
        component: () => import('../../views/native-js/Battery.vue'),
    },
    {
        path: '/deviceorientation',
        name: "Deviceorientation",
        component: () => import('../../views/native-js/Deviceorientation.vue'),
    },
    {
        path: '/networkInfo',
        name: "NetworkInfo",
        component: () => import('../../views/native-js/NetworkInfo.vue'),
    },
    {
        path: '/notifications',
        name: "Notifications",
        component: () => import('../../views/native-js/Notifications.vue'),
    },
    {
        path: '/mediaDevices',
        name: "MediaDevices",
        component: () => import('../../views/native-js/MediaDevices.vue'),
    },
    {
        path: '/sensor',
        name: "Sensor",
        component: () => import('../../views/native-js/Sensor.vue'),
    },
    {
        path: '/qrScanner',
        name: "QrScanner",
        component: () => import('../../views/native-js/QrScanner.vue'),
    },
    {
        path: '/swipeVideo',
        name: "SwipeVideo",
        component: () => import('../../views/native-js/SwipeVideo.vue'),
    },
    {
        path: '/swipeAudio',
        name: "SwipeAudio",
        component: () => import('../../views/native-js/SwipeAudio.vue'),
    },
].map(v => {
    v.meta = {description: 'native-js' + v.path};
    return v;
})