<script setup>
import { scan, openAppSettings, checkPermissions, requestPermissions, cancel, Format } from '@tauri-apps/plugin-barcode-scanner';
import { ref, onUnmounted } from "vue";

const Scanned = ref({ content: "", format: "", bounds: "" });
let paperStyle = document.getElementById("var-paper").style;

function runFrontQrscan() {
    paperStyle.background = "transparent";
    scan({ windowed: true, cameraDirection: "front" }).then(res => {
        Scanned.value = res;
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        qrCancel();
    })
}

function runSan() {
    paperStyle.background = "transparent";
    scan({ windowed: true, formats: [Format.QRCode] }).then(res => {
        Scanned.value = res;
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        qrCancel();
    })
}

async function qrScan() {
    let state = await checkPermissions();
    switch (state) {
        case 'denied': {
            openAppSettings();
            break;
        }
        case 'granted': {
            runSan();
            break;
        }
        case 'prompt': {
            await requestPermissions();
            break;
        }
    }
}

function qrCancel() {
    cancel();
    paperStyle.background = "";
}


onUnmounted(() => {
    qrCancel();
});
</script>
<template>
    <div style="height: 50%;border: dashed red;">
        <h1>{{ Scanned.content }}</h1>
        <h2>{{ Scanned.format }}</h2>
        <h3>{{ Scanned.bounds }}</h3>
    </div>
    <var-space justify="center">
        <var-button @click="qrScan" block type="primary">scan</var-button>
        <var-button @click="runFrontQrscan" block type="info">scan front</var-button>
        <var-button @click="qrCancel" block type="danger">cancel</var-button>
    </var-space>
</template>