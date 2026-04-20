<route>
{meta: {
description: "This plugin allows you to open files and URLs in a specified, or the default, application. It also supports “revealing” files in the system’s file explorer.",
}}
</route>
<script setup>
import { type } from '@tauri-apps/plugin-os';
import { openUrl, openPath, revealItemInDir } from '@tauri-apps/plugin-opener';
import { Snackbar } from '@varlet/ui';
import { appLogDir } from '@tauri-apps/api/path';
import { onMounted, ref } from 'vue';
const osType = type();
const applog = ref('');

onMounted(() => {
    appLogDir().then(res => applog.value = res);
})

function openUrlFun() {
    openUrl('https://tauri.app/plugin/opener/#usage').catch(err => {
        Snackbar.error(err);
    })
}

function openPathFun() {
    openPath(applog.value + '/tauri-plugins-code.log').catch(err => {
        Snackbar.error(err);
    })
}

async function revealItemInDirFun() {
    revealItemInDir(applog.value + '/tauri-plugins-code.log').catch(err => {
        Snackbar.error(err);
    })
}


</script>
<template>
    <var-card title="opener">
        <var-button block type="primary" @click="openUrlFun">openUrl</var-button>
        <var-button block type="success" @click="openPathFun">openPath {{ applog }}</var-button>
        <var-button v-if="!['android', 'ios'].includes(osType)" block type="danger"
            @click="revealItemInDirFun">revealItemInDir {{ applog }}</var-button>
    </var-card>
</template>