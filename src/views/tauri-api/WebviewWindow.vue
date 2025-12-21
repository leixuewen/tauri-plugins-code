<script setup>
import {WebviewWindow, getCurrentWebviewWindow, getAllWebviewWindows} from "@tauri-apps/api/webviewWindow";
import {onUnmounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

const unlistens = ref([]);
onUnmounted(() => {
  unlistens.value.forEach(v => v());
  let label = getCurrentWebviewWindow().label;
  getAllWebviewWindows().then(res => {
    res.forEach(v => v.label === label || v.destroy());
  })
});

function newWebviewWindow() {
  let label = 'my-label-' + parseInt(Math.random() * 1000);
  let webview = new WebviewWindow(label, {
    title: label,
    url: 'https://tauri.app'
  });
  webview.once('tauri://created', function () {
    // webview successfully created
    console.log('webview successfully created');
  });
  webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log(e);
  });
  webview.onCloseRequested((e) => {
    console.log(e);
  });
}

function listenFun() {
  getAllWebviewWindows().then(res => {
    res.forEach(v => v.listen('tauri-webview-window-listen', e => {
      console.log(e);
      Snackbar.success(JSON.stringify(e.payload));
    }).then(unlisten => unlistens.value.push(unlisten)));
  });
}

function onceFun() {
  getAllWebviewWindows().then(res => {
    res.forEach(v => v.once('tauri-webview-window-once', e => {
      console.log(e);
      Snackbar.info(JSON.stringify(e.payload));
    }).then(unlisten => unlistens.value.push(unlisten)));
  });
}

function emitFun() {
  getCurrentWebviewWindow().emit('tauri-webview-window-once', {math_random: Math.random()});
  getCurrentWebviewWindow().emit('tauri-webview-window-listen', {math_random: Math.random()});
}
</script>
<template>
  <var-card>
    <var-button block type="primary" @click="newWebviewWindow">newWebviewWindow</var-button>
    <var-button block type="info" @click="listenFun">listen</var-button>
    <var-button block type="success" @click="onceFun">once</var-button>
    <var-button block type="warning" @click="emitFun">emit</var-button>
  </var-card>
</template>