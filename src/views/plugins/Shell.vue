<script setup>
import { Command, Child, EventEmitter, open } from '@tauri-apps/plugin-shell';
import { Snackbar } from '@varlet/ui';
import { ref } from 'vue';

const cmdRef = ref({});
function runGit() {
    Command.create('run-git').execute().then(res => {
        cmdRef.value = res;
        // console.log(res.code);
        // console.log(res.signal);
        // console.log(res.stderr);
        // console.log(res.stdout);
    }).catch(err => {
        Snackbar.error(err);
    });
}

</script>
<template>
    <var-card title="Shell">
        <var-button block type="primary" @click="runGit()">git -v</var-button>
        <var-button block type="default" @click="open('https://v2.tauri.app/reference/javascript/shell/#returns-30')">
            open https://v2.tauri.app/reference/javascript/shell/#returns-30</var-button>
        <var-button block type="default"
            @click="open('https://v2.tauri.app/reference/javascript/shell/#returns-30', 'firefox')">
            firefox open https://v2.tauri.app/reference/javascript/shell/#returns-30</var-button>
        <var-cell v-for="item in Object.keys(cmdRef)" :key="item" :title="item"
            :description="cmdRef[item] === null ? 'null' : cmdRef[item] + ''" />
    </var-card>
</template>