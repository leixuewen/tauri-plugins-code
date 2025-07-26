<script setup>
import {
    defaultWindowIcon,
    fetchDataStoreIdentifiers,
    getBundleType,
    getIdentifier,
    getName,
    getTauriVersion,
    getVersion,
    hide,
    show,
    setTheme,
    setDockVisibility,
    removeDataStore,
} from '@tauri-apps/api/app';
import { type } from '@tauri-apps/plugin-os';
import { StyleProvider, Themes } from '@varlet/ui';
import { onBeforeMount, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const osType = type();
const theme = ref('light');
const app = ref({
    defaultWindowIcon: {},
    fetchDataStoreIdentifiers: [],
    getBundleType: {},
    getIdentifier: "",
    getName: "",
    getTauriVersion: "",
    getVersion: "",
});

onBeforeMount(() => {
    defaultWindowIcon().then(val => app.value.defaultWindowIcon = val);
    fetchDataStoreIdentifiers().then(val => app.value.fetchDataStoreIdentifiers = val);
    getBundleType().then(val => app.value.getBundleType = val);
    getIdentifier().then(val => app.value.getIdentifier = val);
    getName().then(val => app.value.getName = val);
    getTauriVersion().then(val => app.value.getTauriVersion = val);
    getVersion().then(val => app.value.getVersion = val);
});

function hideFun() {
    hide();
    setTimeout(() => {
        show();
    }, 3000);
}

function setThemeFun() {
    if (theme.value == 'light') {
        setTheme('dark');
        StyleProvider(Themes.md3Dark);
        theme.value = 'dark';
    } else {
        setTheme('light');
        StyleProvider(Themes.md3Light);
        theme.value = 'light';
    }
}

function removeDataStoreFun() {
    app.value.fetchDataStoreIdentifiers.forEach(v => {
        removeDataStore(v).then(res => {
            Snackbar.success('Clear Successfully !');
        }).catch(err => {
            Snackbar.error('Clear Error !' + err);
        });
    })
}

</script>
<template>
    <var-card>
        <var-cell>defaultWindowIcon : {{ app.defaultWindowIcon }}</var-cell>
        <var-cell>fetchDataStoreIdentifiers : {{ app.fetchDataStoreIdentifiers }}</var-cell>
        <var-cell>getBundleType : {{ app.getBundleType }}</var-cell>
        <var-cell>getIdentifier : {{ app.getIdentifier }}</var-cell>
        <var-cell>getName : {{ app.getName }}</var-cell>
        <var-cell>getTauriVersion : {{ app.getTauriVersion }}</var-cell>
        <var-cell>getVersion : {{ app.getVersion }}</var-cell>
        <var-button v-if="osType == 'macos'" block type="primary" @click="hideFun"> app hide => app show</var-button>
        <var-button v-if="osType == 'macos'" block type="primary"
            @click="setDockVisibility(true)">setDockVisibility</var-button>
        <var-button block type="danger" @click="removeDataStoreFun">removeDataStore</var-button>
        <var-button block type="primary" @click="setThemeFun">setTheme {{ theme }}</var-button>
    </var-card>
</template>