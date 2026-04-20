<route>
{meta: {
description: "Position your windows at well-known locations.",
}}
</route>
<script setup>
import { moveWindow, Position } from '@tauri-apps/plugin-positioner';
import { onBeforeMount, ref } from 'vue';

const positions = ref([{ title: '', type: '' }]);
onBeforeMount(() => {
    let p = [];
    let types = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
    Object.keys(Position).forEach(k => {
        let _type = types[Math.floor(Math.random() * types.length)];
        if (isNaN(k) && !k.startsWith('Tray')) {
            p.push({ title: k, type: _type });
        }
    });
    positions.value = p;
});

</script>
<template>
    <var-card title="Positioner">
        <var-button v-for="item of positions" :key="item.title" :type="item.type" block
            @click="moveWindow(Position[item.title])">{{ item.title }}</var-button>
    </var-card>
</template>