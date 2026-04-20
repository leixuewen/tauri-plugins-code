<route>
{meta: {
description: "Save window positions and sizes and restore them when the app is reopened.",
}}
</route>
<script setup>
import {
  restoreState, restoreStateCurrent, saveWindowState, filename, StateFlags,
} from '@tauri-apps/plugin-window-state';
import {ref} from "vue";

const file_name = ref();

function filenameFun() {
  filename().then(val => file_name.value = val);
}
</script>
<template>
  <var-card title="Manual">
    <var-button block type="danger" @click="restoreState('main', StateFlags.ALL)">restoreState</var-button>
    <var-button block type="primary" @click="saveWindowState(StateFlags.ALL)">saveWindowState</var-button>
    <var-button block type="info" @click="restoreStateCurrent(StateFlags.ALL)">restoreStateCurrent</var-button>
    <var-button block type="success" @click="filenameFun">filename {{ file_name }}</var-button>
  </var-card>
</template>