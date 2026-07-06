<route>
{meta: {
description: "A Tauri plugin for Android application lifecycle control (minimize, close, exit, state).",
}}
</route>
<script setup>
import {
  minimizeApp,
  closeApp,
  exitApp,
  isAppInForeground,
} from 'tauri-plugin-app-control-api';
import {Snackbar} from "@varlet/ui";

function appControl(fun) {
  fun().then(v => Snackbar.success(JSON.stringify(v))).catch(v => Snackbar.error(v));
}
</script>

<template>
  <var-card title="app-control">
    <var-button block type="success" @click="appControl(minimizeApp)">minimizeApp</var-button>
    <var-button block type="warning" @click="appControl(closeApp)">closeApp</var-button>
    <var-button block type="danger" @click="appControl(exitApp)">exitApp</var-button>
    <var-button block type="info" @click="appControl(isAppInForeground)">isAppInForeground</var-button>
  </var-card>
</template>