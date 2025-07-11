<script setup>
import { checkStatus, authenticate } from '@tauri-apps/plugin-biometric';
import { ref, onBeforeMount } from 'vue';
import { Snackbar } from '@varlet/ui';
import "@varlet/ui/es/snackbar/style";

const disabled = ref(false);

onBeforeMount(() => {
    checkAuthenticate()
});

async function checkAuthenticate() {
    const status = await checkStatus();
    disabled.value = !status.isAvailable;
}

async function biometric() {
    Snackbar.loading("Authenticate...");

    let options = {
        // Set true if you want the user to be able to authenticate using phone password
        allowDeviceCredential: false,
        // Feature won't work if Canceled
        cancelTitle: "取消",

        // maxAttemps: 5,

        // iOS only feature
        fallbackTitle: 'Sorry, authentication failed',

        // Android only features
        title: 'Tauri feature',
        subtitle: 'Authenticate to access the locked Tauri function',
        confirmationRequired: true,
    }
    try {
        await authenticate('This feature is locked', options);
        Snackbar.success('Hooray! Successfully Authenticated! We can now perform the locked Tauri function!');
    } catch (err) {
        Snackbar.error('Oh no! Authentication failed because ' + err.message);
    }
}

</script>
<template>
    <var-space justify="center">
        <var-icon size="99" name="account-circle-outline" />
    </var-space>
    <var-space justify="center">
        <var-button v-if="disabled" disabled text>you mobile not supported biometric</var-button>
        <var-button v-else @click="biometric" block type="primary"> Authenticate </var-button>
    </var-space>
</template>