<script setup>
import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog';
import { ref } from 'vue';

const askBool = ref();
const confirmBool = ref();
const multiple = ref([]);
const directory = ref([]);
const saveStr = ref('');

function askFun() {
    // ask('Are you sure?', 'Tauri');
    ask('This action cannot be reverted. Are you sure?', {
        title: 'Tauri',
        kind: 'warning', // 'info' | 'warning' | 'error';
        // okLabel: 'ok',
        // cancelLabel: 'cancel',
    }).then(res => {
        askBool.value = res;
    });
}

function confirmFun() {
    // confirm('Are you sure?', 'Tauri');
    confirm('This action cannot be reverted. Are you sure?', {
        title: 'Tauri',
        kind: 'warning', //'info' | 'warning' | 'error';
        // okLabel: 'ok',
        // cancelLabel: 'cancel',
    }
    ).then(res => confirmBool.value = res);
}

function messageFun() {
    // message('Tauri is awesome', 'Tauri');
    message('File not found', {
        title: 'Tauri',
        kind: 'error', // 'info' | 'warning' | 'error';
        // okLabel: 'ok',
    });
}

function openMultiple() {
    open({
        multiple: true,
        // filters: [{
        //     name: 'Image',
        //     extensions: ['png', 'jpeg']
        // }]
    }).then(res => {
        console.log(res);
        if (res) {
            multiple.value = res;
        } else {
            multiple.value = [];
        }
    });
}

function openDirectory() {
    open({
        directory: true,
        multiple: true,
        // defaultPath: await appDir(),
    }).then(res => {
        console.log(res);
        if (res) {
            directory.value = res;
        } else {
            directory.value = [];
        }
    });
}

function saveFun() {
    save({
        filters: [{
            name: 'Image',
            extensions: ['png', 'jpeg']
        }]
    }
    ).then(res => {
        console.log(res);
        if (res) {
            saveStr.value = res;
        } else {
            saveStr.value = "";
        }
    });
}
</script>
<template>
    <var-button type="primary" block @click="askFun">ask : {{ askBool }}</var-button>
    <var-button type="primary" block @click="confirmFun">confirm : {{ confirmBool }}</var-button>
    <var-button type="warning" block @click="messageFun">message</var-button>
    <var-button type="success" block @click="openMultiple">open multiple</var-button>
    <var-card v-show="multiple.length > 0">{{ multiple }}</var-card>
    <var-button type="success" block @click="openDirectory">open directory</var-button>
    <var-card v-show="directory.length > 0">{{ directory }}</var-card>
    <var-button type="danger" block @click="saveFun">save : {{ saveStr }}</var-button>
</template>
<style scoped>
.var-button {
    margin: 10px 0;
}
</style>