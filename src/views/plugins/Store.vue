<route>
{meta: {
description: "This plugin provides a persistent key-value store. This is one of many options to handle state in your application.",
}}
</route>
<script setup>
import { Store, LazyStore } from '@tauri-apps/plugin-store';
import { Snackbar } from '@varlet/ui';
import { onMounted, onUnmounted, ref } from 'vue';

let store = Store.prototype;
// let store = LazyStore.prototype;
const storeRef = ref({});

onMounted(async () => {
    // store = new LazyStore('store.json');
    // store = await Store.load('store.json'， { autoSave: false });
    store = await Store.load('store.json');
    store.onChange((k, v) => {
        storeRef.value[k] = v;
    });
    store.keys().then(res => {
        res.forEach(k => {
            store.get(k).then(v => {
                storeRef.value[k] = v;
            });
        })
    })
});

onUnmounted(() => {
    store.save();
});

async function loadFun() {
    store = await Store.load('store.json')
}

function setFun() {
    store.set('some-key', { value: Math.random() }).then(res => {
        Snackbar.success('store set Successfully !');
    }).catch(err => {
        Snackbar.error(err);
    })
}

async function getFun() {
    store.get('some-key').then(res => {
        Snackbar.success(JSON.stringify(res));
    }).catch(err => {
        Snackbar.error(err);
    })
}

</script>
<template>
    <var-card>
        <var-button type="primary" block @click="loadFun">load store.json </var-button>
        <var-button type="warning" block @click="setFun">set value </var-button>
        <var-button type="success" block @click="getFun">get key </var-button>
        <var-cell>{{ storeRef }}</var-cell>
    </var-card>
</template>