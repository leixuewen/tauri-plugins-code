export default [
    {
        path: '/barcodeScanner',
        name: 'Barcode Scanner',
        component: () => import('@/views/plugins/BarcodeScanner.vue'),
        meta: {
            description: "Allows your mobile application to use the camera to scan QR codes, EAN-13 and other kinds of barcodes.",
        }
    },
    {
        path: '/biometric',
        name: "Biometric",
        component: () => import('@/views/plugins/Biometric.vue'),
        meta: {
            description: "Prompt the user for biometric authentication on Android and iOS.",
        }
    },
    {
        path: '/nfc',
        name: "NFC",
        component: () => import('@/views/plugins/NFC.vue'),
        meta: {
            description: "Read and write NFC tags on Android and iOS.",
        }
    },
]