<script setup>
import {Webview, getCurrentWebview, getAllWebviews} from "@tauri-apps/api/webview";
import {Snackbar} from '@varlet/ui';
import {onUnmounted, ref} from "vue";

/**
 * @type {import('vue').Ref<Webview>}
 */
const webview = ref(Webview.getCurrent());
onUnmounted(() => {
  unlistenFn();
});

function unlistenFn() {
}

function listenFun() {
  unlistenFn();
  webview.value.listen('tauri', e => {
    console.log(e);
    Snackbar.success(JSON.stringify(e.payload));
  }).then(res => unlistenFn = res);
}

function emitFun() {
  webview.value.emit('tauri', {loggedIn: true, token: 'authToken', math_random: Math.random()});
}

function onceFun() {
  webview.value.once('tauri-once', e => {
    console.log(e);
    Snackbar.success(JSON.stringify(e.payload));
  });
}

function emitToFun() {
  webview.value.emitTo('main', 'tauri-once', {loggedIn: true, token: 'authToken', math_random: Math.random()});
}

function hideShow() {
  webview.value.hide();
  setTimeout(() => {
    webview.value.show();
  }, 3000);
}

function hideShow2() {
  webview.value.window.hide();
  setTimeout(() => {
    webview.value.window.show();
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

const staticWeb = ref({
  label: {},
  current: {},
  all: [],
});

function staticWebview() {
  staticWeb.value.current = Webview.getCurrent();
  Webview.getByLabel('main').then(res => staticWeb.value.label = res);
  Webview.getAll().then(res => staticWeb.value.all = res);
}
</script>
<template>
  <var-card :title="'Webview : ' + webview.label">
    <var-button block type="primary" @click="listenFun">listen</var-button>
    <var-button block type="info" @click="emitFun">emit</var-button>
    <var-button block type="info" @click="onceFun">once</var-button>
    <var-button block type="info" @click="emitToFun">emitTo</var-button>
    <var-button block type="default" @click="hideShow">hide show</var-button>
    <var-button block type="default" @click="hideShow2">hide show2</var-button>
    <var-button block type="warning" @click="positionFun"> position {{ position }}</var-button>
    <var-button block type="warning" @click="sizeFun"> size {{ size }}</var-button>
    <!-- <var-button block type="danger" @click="webview.close()">close</var-button> -->
    <var-button block type="info" @click="webview.setZoom(2)">setZoom(2)</var-button>
    <var-button block type="info" @click="webview.setZoom(1)">setZoom(1)</var-button>
    <var-button block type="default" @click="webview.setAutoResize(true)">setAutoResize</var-button>
    <var-button block type="danger" @click="webview.clearAllBrowsingData()">clearAllBrowsingData</var-button>
  </var-card>
  <var-card title="Webview static">
    <var-button block @click="staticWebview">get Webview</var-button>
    <var-cell>current => {{ staticWeb.current }}</var-cell>
    <var-cell>label => {{ staticWeb.label }}</var-cell>
    <var-cell>all => {{ staticWeb.all }}</var-cell>
  </var-card>
</template>