<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const networkInfo = ref({
    downlink: 0,
    downlinkMax: Infinity,
    effectiveType: "",
    rtt: 0,
    saveData: false,
    type: "",
});

let networkInformation = navigator.connection;
onMounted(() => {
    console.log(networkInformation);
    updateNetworkInfo(networkInformation);
    networkInformation.onchange = onchange;
    networkInformation.ontypechange = ontypechange;

    addEventListener("online", event => {
        Snackbar.success("online online online");
    });
    addEventListener("offline", event => {
        Snackbar.error("offline offline offline");
    });
});

onUnmounted(() => {
    networkInformation.onchange = null;
    networkInformation.ontypechange = null;
    removeEventListener("online", () => { });
    removeEventListener("offline", () => { });
});

function updateNetworkInfo(event) {
    networkInfo.value.downlink = event.downlink;
    networkInfo.value.downlinkMax = event.downlinkMax;
    networkInfo.value.effectiveType = event.effectiveType;
    networkInfo.value.rtt = event.rtt;
    networkInfo.value.saveData = event.saveData;
    networkInfo.value.type = event.type;
}

function onchange(event) {
    updateNetworkInfo(event);
    console.log('onchange', event);
}

function ontypechange(event) {
    updateNetworkInfo(event);
    console.log('ontypechange', event);
}

</script>
<template>
    <var-card title="NetworkInfo">
        <var-cell title="downlink" :description="networkInfo.downlink + ''" />
        <var-cell title="downlinkMax" :description="networkInfo.downlinkMax + ''" />
        <var-cell title="effectiveType" :description="networkInfo.effectiveType" />
        <var-cell title="rtt" :description="networkInfo.rtt + ''" />
        <var-cell title="saveData" :description="networkInfo.saveData + ''" />
        <var-cell title="type" :description="networkInfo.type" />
    </var-card>
</template>