export default [
    {
        path: '/geolocatons',
        name: "Geolocaton",
        component: () => import('@/views/native-js/Geolocaton.vue'),
    },
    {
        path: '/vibrate',
        name: "Vibrate",
        component: () => import('@/views/native-js/Vibrate.vue'),
    },
    {
        path: '/battery',
        name: "Battery",
        component: () => import('@/views/native-js/Battery.vue'),
    },
    {
        path: '/deviceorientation',
        name: "Deviceorientation",
        component: () => import('@/views/native-js/Deviceorientation.vue'),
    },
].map(v => { v.meta = { description: 'native-js' + v.path }; return v; })