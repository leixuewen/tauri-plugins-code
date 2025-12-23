<script setup>
import WebSocket from '@tauri-apps/plugin-websocket';
import { onBeforeUnmount, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

let ws = WebSocket.prototype;
const msgs = ref([]);
const val = ref("");
const wsurl = ref("ws://127.0.0.1:8080");

onBeforeUnmount(() => {
    disconnect()
});

function connect() {
    WebSocket.connect(wsurl.value).then(res => {
        ws = res;
        ws.addListener(msg => {
            msgs.value.push(msg);
        })
    }).catch(err => {
        Snackbar.error(err);
    })
}

function send() {
    Snackbar.loading("send msg ...");
    ws.send(val.value).catch(err => {
        Snackbar.error(err);
    });
}

function disconnect() {
  if (!ws.id) return;
  ws.disconnect().catch(err => {
    Snackbar.error(err);
  });
}
</script>
<template>
    <var-card>
        <var-input v-model="wsurl" />
        <var-button block type="primary" @click="connect">connect</var-button>
        <var-input v-model="val" />
        <var-button block type="info" @click="send">send</var-button>
        <var-button block type="warning" @click="disconnect">disconnect</var-button>
        <var-cell v-for="item of msgs">{{ item }}</var-cell>
    </var-card>
</template>