<script setup>
import {
    saveWindowState,
    StateFlags,
    restoreStateCurrent,
} from '@tauri-apps/plugin-window-state';

</script>
<template>
    <var-card title="Manual">
        <var-button block type="primary" @click="saveWindowState(StateFlags.ALL)">saveWindowState</var-button>
        <var-button block type="info" @click="restoreStateCurrent(StateFlags.ALL)">restoreStateCurrent</var-button>
    </var-card>
</template>