<route>
{meta: {
description: "Register global shortcuts.",
}}
</route>
<script setup>
import { register, unregister, unregisterAll, isRegistered } from '@tauri-apps/plugin-global-shortcut';
import { Snackbar } from '@varlet/ui';
import { onUnmounted } from 'vue';

function registerFun(shortcuts) {
    register(shortcuts, event => {
        Snackbar.info(JSON.stringify(event));
    }).catch(err => {
        Snackbar.error(err);
    });
}

function isRegisteredFun(shortcuts) {
    isRegistered(shortcuts).then(res => {
        Snackbar(shortcuts + ' isRegistered : ' + res);
    }).catch(err => {
        Snackbar.error(shortcuts + 'err : ' + err);
    });
}

onUnmounted(() => {
    unregisterAll();
})
</script>
<template>
    <var-card title="global-shortcut">
        <var-button block type="primary" @click="registerFun('CommandOrControl+Shift+C')">
            register : CommandOrControl+Shift+C</var-button>
        <var-button block type="success" @click="unregister('CommandOrControl+Shift+C')">
            unregister : CommandOrControl+Shift+C</var-button>
        <var-button block type="warning" @click="registerFun('CommandOrControl+Shift+X')">
            register : CommandOrControl+Shift+X</var-button>
        <var-button block type="danger" @click="unregisterAll">
            unregisterAll : CommandOrControl+Shift+C</var-button>
        <var-button block type="info" @click="isRegisteredFun('CommandOrControl+Shift+C')">
            isRegistered : CommandOrControl+Shift+C</var-button>
    </var-card>
</template>