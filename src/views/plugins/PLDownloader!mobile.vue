<script setup>
import {
  downloadPrivate,
  downloadPublic,
  saveFilePrivateFromBuffer,
  saveFilePublicFromBuffer,
  ping,
  copyFilePath,
} from "tauri-plugin-pldownloader-api";
import {Snackbar} from '@varlet/ui';

function pingFun() {
  ping(new Date().toISOString()).then(res => Snackbar.success(res)).catch(err => Snackbar.error(err))
}

function downloadPrivateFun() {
  downloadPrivate({
    url: "https://vitejs.cn/vite3-cn/logo.svg",
    fileName: "vite.svg"
  }).then(res => Snackbar.success(JSON.stringify(res))).catch(err => Snackbar.error(err))
}

function downloadPublicFun() {
  downloadPublic({
    url: "https://crates.io/assets/cargo.png",
    // fileName: "cargo.png",
    // mimeType: "image/png",
  }).then(res => Snackbar.success(JSON.stringify(res))).catch(err => Snackbar.error(err))
}

function saveFilePrivateFromBufferFun() {
  saveFilePrivateFromBuffer({
    data: new TextEncoder().encode(new Date().toISOString()),
    fileName: "saveFilePrivateFromBuffer.txt",
  }).then(res => Snackbar.success(JSON.stringify(res))).catch(err => Snackbar.error(err))
}

function saveFilePublicFromBufferFun() {
  saveFilePublicFromBuffer({
    data: new TextEncoder().encode(new Date().toISOString()),
    fileName: "saveFilePublicFromBuffer.txt",
    // mimeType: "",
  }).then(res => Snackbar.success(JSON.stringify(res))).catch(err => Snackbar.error(err))
}

</script>
<template>
  <var-card title="PLDownloader">
    <var-button block type="info" @click="pingFun">ping</var-button>
    <var-button block type="primary" @click="downloadPrivateFun">downloadPrivate</var-button>
    <var-button block type="danger" @click="downloadPublicFun">downloadPublic</var-button>
    <var-button block type="warning" @click="saveFilePrivateFromBufferFun">saveFilePrivateFromBuffer</var-button>
    <var-button block type="danger" @click="saveFilePublicFromBufferFun">saveFilePublicFromBuffer</var-button>
  </var-card>
</template>