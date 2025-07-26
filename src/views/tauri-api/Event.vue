<script setup>
import {
    once,
    listen,
    emit,
    emitTo,
    TauriEvent,
} from '@tauri-apps/api/event';
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';
const event = ref({
    once: {},
    listen: {},
});

function onceUnlisten() { };
function listenUnlisten() { };
onBeforeMount(async () => {
    onceUnlisten = await once('loaded', val => {
        event.value.once = val;
        console.log('App is loaded', val);
    });
    listenUnlisten = await listen('error', val => {
        event.value.listen = val;
        console.log('Got error', val);
    });
});
onUnmounted(() => {
    onceUnlisten();
    listenUnlisten();
});

function emitFun(event) {
    emit(event, { loggedIn: true, token: Math.random() }).then(() => {
        Snackbar.success("ok");
    }).catch(err => {
        Snackbar.error(err);
    });
}

function emitToFun() {
    emitTo('main', 'frontend-loaded', { loggedIn: true, token: Math.random() }).then(() => {
        Snackbar.success("ok");
    }).catch(err => {
        Snackbar.error(err);
    });
}

</script>
<template>
    <var-card>
        <var-cell title="emit once" :description="event.once" />
        <var-cell title="emit listen" :description="event.listen" />
        <var-button block type="info" @click="emitFun('loaded')">emit once</var-button>
        <var-button block type="primary" @click="emitFun('error')">emit listen</var-button>
        <var-button block type="warning" @click="emitToFun">emitTo</var-button>
    </var-card>
    <var-card title="TauriEvent">
        <var-cell v-for="item of Object.keys(TauriEvent)" :title="item" :description="TauriEvent[item]" />
    </var-card>
</template>