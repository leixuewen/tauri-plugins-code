<script setup>
import {
  Channel,
  convertFileSrc,
  invoke,
  isTauri,
} from '@tauri-apps/api/core';

import {onBeforeMount, ref} from 'vue';
import {basename, homeDir, resolveResource, sep} from "@tauri-apps/api/path";
import {mkdir, writeFile} from "@tauri-apps/plugin-fs";
import {getIdentifier} from "@tauri-apps/api/app";
import {Snackbar} from "@varlet/ui";

const greet = ref('');

function greetFun() {
  invoke('greet', {name: ''}).then(val => greet.value = val);
}

const webview_window = ref();
const app_handle = ref();
const request = ref();
onBeforeMount(() => {
  invoke('webview_window').then(val => webview_window.value = val);
  invoke('app_handle').then(val => app_handle.value = val);
  invoke('ipc_request').then(val => request.value = val);
})

const channels = ref([]);

function channelFun() {
  channels.value = [];
  invoke('ipc_channel', {
    channel: new Channel(m => {
      channels.value.push(m)
    })
  })
}

const href = ref("");
let resourcePath = "./resources/vue.png";
resolveResource(resourcePath).then(v => href.value = convertFileSrc(v));

let path = ref("");
homeDir().then(v => {
  path.value = v;
  return getIdentifier();
}).then(id => {
  path.value += sep() + id + sep();
}).catch(err => Snackbar.error(err));

async function download(url) {
  Snackbar.loading("Downloading file...");
  try {
    await mkdir(path.value, {recursive: true});
    let response = await fetch(url);
    if (!response.ok) new Error(response.statusText);
    await writeFile(path.value + await basename(resourcePath), response.body);
    Snackbar.success("File downloaded successfully.");
  } catch (e) {
    Snackbar.error(e);
  }
}
</script>
<template>
  <var-card>
    <var-cell>isTauri {{ isTauri() }}</var-cell>
    <var-cell>convertFileSrc {{ convertFileSrc("/assets/vue.svg") }}</var-cell>
    <var-button @click="greetFun" block type="primary">invoke {{ greet }}</var-button>
  </var-card>
  <var-card>
    <var-button @click="download(href)" block type="danger">download: {{ resourcePath }} ==> {{ path }}</var-button>
    <var-button @click="channelFun" block type="success">Channel</var-button>
    <var-cell v-for="item in channels">{{ item }}</var-cell>
  </var-card>
  <var-card>{{ request }}</var-card>
  <var-card>{{ app_handle }}</var-card>
  <var-card>{{ webview_window }}</var-card>
</template>