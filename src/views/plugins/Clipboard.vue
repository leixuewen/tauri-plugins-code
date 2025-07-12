<script setup>
import { writeText, readText, clear } from '@tauri-apps/plugin-clipboard-manager';
import { Snackbar } from '@varlet/ui';
import { ref } from 'vue';

const txt = ref("Clipboard textarea");

function clern() {
    clear().then(() => {
        txt.value = '';
        Snackbar.success('Clear Successfully !');
    }).catch(err => {
        Snackbar.error('Clear Error !' + err);
    });
}

async function copy() {
    writeText(txt.value).then(() => {
        Snackbar.success('Copy Successfully !');
    }).catch(err => {
        Snackbar.error('Copy Error !' + err);
    });
}

async function stickup() {
    readText().then(res => {
        txt.value += res;
        Snackbar.success('Stickup Successfully !');
    }).catch(err => {
        Snackbar.error('Stickup Error !' + err);
    });
}

</script>
<template>
    <var-input textarea v-model="txt" />
    <var-space justify="center">
        <var-button type="info" @click="clern">clern</var-button>
        <var-button type="primary" @click="copy">copy</var-button>
        <var-button type="danger" @click="stickup">stickup</var-button>
    </var-space>
</template>