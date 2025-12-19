<script setup>
import {
  Channel,
  convertFileSrc,
  invoke,
  isTauri,
} from '@tauri-apps/api/core';

import {onBeforeMount, ref} from 'vue';

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
</script>
<template>
  <var-card>
    <var-cell>isTauri {{ isTauri() }}</var-cell>
    <var-cell>convertFileSrc {{ convertFileSrc("/assets/vue.svg") }}</var-cell>
    <var-button @click="greetFun" block type="primary">invoke {{ greet }}</var-button>
  </var-card>
  <var-card>
    <var-button @click="channelFun" block type="success">Channel</var-button>
    <var-cell v-for="item in channels">{{ item }}</var-cell>
  </var-card>
  <var-card>{{ request }}</var-card>
  <var-card>{{ app_handle }}</var-card>
  <var-card>{{ webview_window }}</var-card>
</template>