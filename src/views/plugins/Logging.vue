<script setup>
import { attachConsole, attachLogger, warn, debug, trace, info, error } from '@tauri-apps/plugin-log';
import { onUnmounted } from 'vue';

function attachConsoleUnlistenFn() { };
async function attachConsoleFun() {
    attachConsoleUnlistenFn = await attachConsole();
}

function attachLoggerUnlistenFn() { };
async function attachLoggerFun() {
    attachLoggerUnlistenFn = await attachLogger(recordPayload => {
        console.log(recordPayload.level + recordPayload.message);
    });
}

onUnmounted(() => {
    attachConsoleUnlistenFn();
    attachLoggerUnlistenFn();
});

function log() {
    warn('warn...');
    debug('debug...');
    trace('trace...');
    info('info...');
    error('info...');
}

</script>
<template>
    <var-card title="Log">
        <var-button block type="primary" @click="log">info</var-button>
        <var-button block type="info" @click="attachConsoleFun">attachConsole</var-button>
        <var-button block @click="attachLoggerFun">attachLogger</var-button>
    </var-card>
</template>