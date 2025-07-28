<script setup>
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { Snackbar } from '@varlet/ui';
import { onUnmounted, ref } from "vue";

const webview = ref(getCurrentWebview());

onUnmounted(() => {
    unlistenFn();
});

function unlistenFn() { };
function listenFun() {
    webview.value.listen('tauri', e => {
        console.log(e);
        Snackbar.success(JSON.stringify(e.payload));
    });
}

function emitFun() {
    webview.value.emit('tauri', { loggedIn: true, token: 'authToken' });
}

function hideShow() {
    webview.value.hide();
    setTimeout(() => {
        webview.value.show();
    }, 3000);
}

const position = ref();
function positionFun() {
    webview.value.position().then(val => {
        position.value = val;
    }).catch(err => {
        Snackbar.error(JSON.stringify(err));
    });
}

const size = ref();
function sizeFun() {
    webview.value.size().then(val => {
        size.value = val;
    }).catch(err => {
        Snackbar.error(JSON.stringify(err));
    });
}

</script>
<template>
    <var-card :title="'Webview : ' + webview.label">
        <var-button block type="primary" @click="listenFun">listen</var-button>
        <var-button block type="info" @click="emitFun">emit</var-button>
        <var-button block type="default" @click="hideShow">hide show</var-button>
        <var-button block type="warning" @click="positionFun"> position {{ position }}</var-button>
        <var-button block type="warning" @click="sizeFun"> size {{ size }}</var-button>
        <!-- <var-button block type="danger" @click="webview.close()">close</var-button> -->
        <var-button block type="info" @click="webview.setZoom(2)">setZoom(2)</var-button>
        <var-button block type="info" @click="webview.setZoom(1)">setZoom(1)</var-button>
        <var-button block type="default" @click="webview.setAutoResize(true)">setAutoResize</var-button>
        <var-button block type="danger" @click="webview.clearAllBrowsingData()">clearAllBrowsingData</var-button>
    </var-card>
</template>