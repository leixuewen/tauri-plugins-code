<script setup>
import {
    convertFileSrc,
    invoke,
    isTauri,
} from '@tauri-apps/api/core';
import { LogicalPosition } from '@tauri-apps/api/dpi';

import { ref } from 'vue';

const greet = ref('');


function greetFun() {
    invoke('greet', { name: '' }).then(val => greet.value = val);
}
</script>
<template>
    <var-card>
        <var-cell>isTauri {{ isTauri() }}</var-cell>
        <var-cell>convertFileSrc {{ convertFileSrc("/assets/vue.svg") }}</var-cell>
        <var-button @click="greetFun" block type="primary">invoke {{ greet }}</var-button>
    </var-card>
</template>