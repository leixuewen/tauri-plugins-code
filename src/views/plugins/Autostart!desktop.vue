<route>
{meta: {
description: "Automatically launch your application at system startup.",
}}
</route>
<script setup>
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
import { ref, onBeforeMount } from 'vue';

onBeforeMount(() => {
    getAutostart();
})

const autostart = ref(false);
const loadingEnable = ref(false);
const loadingDisable = ref(false);


async function getAutostart() {
    autostart.value = await isEnabled();
    console.log(autostart);
}

function runEnable() {
    loadingEnable.value = true;
    enable().finally(() => {
        loadingEnable.value = false;
        getAutostart()
    })
}

function runDisable() {
    loadingDisable.value = true;
    disable().finally(() => {
        loadingDisable.value = false;
        getAutostart()
    })
}

</script>
<template>
    <var-button block style="margin: 16px 0 32px;" type="primary" text> Autostart is {{ autostart }}</var-button>
    <var-button block type="primary" :loading="loadingEnable" @click="runEnable">enable</var-button>
    <var-button block type="danger" :loading="loadingDisable" @click="runDisable">disable</var-button>
</template>