<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Snackbar } from '@varlet/ui';
import DarcodeDetectorApiPolyfill from 'barcode-detector-api-polyfill';

let stream, stream1, interval;
onUnmounted(() => {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        clearInterval(interval);
    }
    if (stream1) {
        stream1.getTracks().forEach(t => t.stop());
    }
});

let video;
onMounted(() => {
    video = document.getElementById('ScanCodeVideo');
});

function torch(_stream, _bool) {
    _stream.getVideoTracks()[0].applyConstraints({
        advanced: [{ torch: _bool }]
    });
}

function openTorch() {
    if (stream) {
        torch(stream, true);
        return;
    }
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    }).then(_stream => {
        stream1 = _stream;
        torch(_stream, true);
    }).catch(error => {
        console.error(error)
        Snackbar.error(error);
    });
}

function closeTorch() {
    if (stream) {
        torch(stream, false);
    } else if (stream1) {
        stream1.getTracks().forEach(t => t.stop());
        stream1 = null;
    }
}

function scanCode(_facingMode) {
    cancelScanCode();
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: _facingMode }
    }).then(_stream => {
        stream = _stream;
        video.srcObject = _stream;
        interval = setInterval(barcodeDetectorVideo, 200); // 每200ms处理一次；
    }).catch(error => {
        console.error(error)
        Snackbar.error(error);
    });
}

function cancelScanCode() {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
    }
    video.srcObject = null;
    clearInterval(interval);
}

let barcodeDetector;
let formats = ['aztec', 'code_128', 'code_39', 'code_93', 'codabar', 'data_matrix', 'ean_13', 'ean_8', 'itf', 'pdf417', 'qr_code', 'upc_a', 'upc_e'];
if (!("BarcodeDetector" in globalThis)) {
    console.log("此浏览器不支持条形码检测器。");
    // let DarcodeDetectorApiPolyfill = require('barcode-detector-api-polyfill');
    barcodeDetector = new DarcodeDetectorApiPolyfill({ formats });
} else {
    console.log("条形码检测器是支持的！");
    barcodeDetector = new BarcodeDetector({ formats });
}

// BarcodeDetector.getSupportedFormats().then(supportedFormats => {
//     console.log(supportedFormats);
// });

function barcodeDetectorVideo() {
    barcodeDetector.detect(video).then((barcodes) => {
        // console.log(barcodes);
        if (barcodes.length > 0) {
            cancelScanCode();
            alert(JSON.stringify(barcodes));
        }
    }).catch((err) => {
        console.log(err);
        Snackbar.error(err);
    });
}

</script>
<template>
    <var-card title="ScanCode">
        <video id="ScanCodeVideo" width="100%" height="360px" playsinline="true" autoplay
            poster="/src/assets/tauri.svg"></video>
        <var-button block type="success" @click="scanCode('environment')">backScanCode</var-button>
        <var-button block type="info" @click="scanCode('user')">frontScanCode</var-button>
        <var-button block type="danger" @click="cancelScanCode">cancelScanCode</var-button>
    </var-card>
    <var-card title="Torch">
        <var-button block type="success" @click="openTorch">openTorch</var-button>
        <var-button block type="danger" @click="closeTorch">closeTorch</var-button>
    </var-card>
</template>