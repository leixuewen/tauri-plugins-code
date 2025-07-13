<script setup>
import { fetch } from '@tauri-apps/plugin-http';
import { ref } from 'vue';
import { Snackbar } from '@varlet/ui';


const apiAllow = ref('https://api.ipstack.com/72.229.28.185,110.174.165.78?access_key=a9b57e3b51c26e541');
const responseAllow = ref('');

async function httpAllow() {
    let _snackbar = Snackbar.loading(apiAllow.value);
    try {
        let _response = await fetch(apiAllow.value, {
            method: 'GET',
        });
        // console.log(_response);
        responseAllow.value = JSON.stringify(await _response.json());
        _snackbar.clear();
    } catch (err) {
        Snackbar.error(err);
    }
}

const apiDeny = ref('https://data.fixer.io/api/convert?access_key=dd1eedbf845ad4&from=USD&to=INR&amount=100');
const responseDeny = ref('');

async function httpDeny() {
    let _snackbar = Snackbar.loading(apiAllow.value);
    try {
        let _response = await fetch(apiDeny.value, {
            method: 'GET',
        });
        // console.log(_response);
        responseDeny.value = JSON.stringify(await _response.json());
        _snackbar.clear();
    } catch (err) {
        Snackbar.error(err);
    }
}

</script>
<template>
    <var-card>
        <template #title>
            <var-link target="_blank" text-size="30" type="primary"
                href="https://apilayer.com/products#explore-playground">
                Allow
            </var-link>
        </template>
        <var-input v-model="apiAllow" />
        <var-button block type="primary" @click="httpAllow">send</var-button>
        <var-input disabled v-model="responseAllow" textarea placeholder="response" />
    </var-card>
    <var-card>
        <template #title>
            <var-link target="_blank" text-size="30" type="primary"
                href="https://apilayer.com/products#explore-playground">
                Deny
            </var-link>
        </template>
        <var-input v-model="apiDeny" />
        <var-button block type="primary" @click="httpDeny">send</var-button>
        <var-input disabled v-model="responseDeny" textarea placeholder="response" />
    </var-card>
</template>