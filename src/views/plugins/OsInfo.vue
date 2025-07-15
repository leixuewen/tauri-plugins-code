<script setup>
import {
    eol, platform, family, version, type, arch, locale, exeExtension, hostname,
} from '@tauri-apps/plugin-os';
import { onMounted, ref } from 'vue';

const localeRef = ref('');
const hostnameRef = ref('');

onMounted(() => {
    locale().then(res => localeRef.value = res);
    hostname().then(res => hostnameRef.value = res);
})
</script>
<template>
    <var-card title="OS Information">
        <var-chip block>eol: {{ eol() }}</var-chip>
        <var-chip block type="primary">platform: {{ platform() }}</var-chip>
        <var-chip block type="success">family: {{ family() }}</var-chip>
        <var-chip block type="danger">version: {{ version() }}</var-chip>
        <var-chip block type="warning">type: {{ type() }}</var-chip>
        <var-chip block type="info">arch: {{ arch() }}</var-chip>
        <var-chip block plain>locale: {{ localeRef }}</var-chip>
        <var-chip block color="#009688">exeExtension: {{ exeExtension() }}</var-chip>
        <var-chip block color="#faecd8" text-color="#e6a23c" plain>hostname: {{ hostnameRef }}</var-chip>
    </var-card>
</template>