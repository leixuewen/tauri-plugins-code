<route>
{meta: {
description: "This plugin provides APIs to access the current process.",
}}
</route>
<script setup>
import { exit, relaunch } from '@tauri-apps/plugin-process';
</script>
<template>
    <var-card title="Process">
        <var-button block type="danger" @click="exit(1)">exit</var-button>
        <var-button block type="success" @click="relaunch">relaunch</var-button>
    </var-card>
</template>