<script setup>
import { WebviewWindow, getCurrentWebviewWindow, getAllWebviewWindows } from "@tauri-apps/api/webviewWindow";
import { onUnmounted } from "vue";

onUnmounted(async () => {
    let wv = getCurrentWebviewWindow();
    let wws = await getAllWebviewWindows();
    wws.forEach(ww => {
        if (wv.label != ww.label) {
            ww.destroy();
        }
    })
});

function newWebviewWindow() {
    let webview = new WebviewWindow('my-label', {
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

</script>
<template>
    <var-card>
        <var-button block type="primary" @click="newWebviewWindow">newWebviewWindow</var-button>
    </var-card>
</template>