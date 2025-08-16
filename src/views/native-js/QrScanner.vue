<script setup>
import QrScanner from 'qr-scanner';
import { onMounted, onUnmounted } from 'vue';

let qrScanner;
// let qrScanner = new QrScanner();
onMounted(() => {
    qrScanner = new QrScanner(
        document.getElementById('QrScannerVideo'),
        result => {
            cancelScanCode();
            alert(JSON.stringify(result));
        },
        {
            maxScansPerSecond: 9,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
        }
    );
    // QrScanner.hasCamera();// Checking for Camera availability
    QrScanner.listCameras(true).then(val => {
        console.log(val);
    });
    // qrScanner.hasFlash(); // check whether the browser and used camera support turning the flash on; async.
    // qrScanner.isFlashOn(); // check whether the flash is on
})

onUnmounted(() => {
    cancelScanCode();
    qrScanner.destroy();
    qrScanner = null;
})

function scanCode(_facingMode) {
    qrScanner.setCamera(_facingMode).then(val => {
        return qrScanner.start()
    });
}

function cancelScanCode() {
    qrScanner.stop();
}


function turnFlashOn() {
    qrScanner.start();
    qrScanner.turnFlashOn();
}

function turnFlashOff() {
    qrScanner.turnFlashOff();
    qrScanner.stop();
}

function toggleFlash() {
    qrScanner.start();
    qrScanner.toggleFlash();
}

</script>
<template>
    <var-card title="ScanCode">
        <video id="QrScannerVideo" width="100%" height="360px" playsinline="true" autoplay
            poster="/src/assets/tauri.svg"></video>
        <var-button block type="success" @click="scanCode('environment')">backScanCode</var-button>
        <var-button block type="info" @click="scanCode('user')">frontScanCode</var-button>
        <var-button block type="danger" @click="cancelScanCode">cancelScanCode</var-button>
    </var-card>
    <var-card title="Flashlight">
        <var-button block type="success" @click="qrScanner.turnFlashOn()">turnFlashOn</var-button>
        <var-button block type="danger" @click="qrScanner.turnFlashOff()">turnFlashOff</var-button>
        <var-button block type="warning" @click="qrScanner.toggleFlash()">toggleFlash</var-button>
    </var-card>
</template>