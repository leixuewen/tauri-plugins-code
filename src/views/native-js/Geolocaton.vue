<script setup>
import { Snackbar } from '@varlet/ui';
import { onUnmounted, ref } from 'vue';

const watchId = ref(0);
const position = ref();

onUnmounted(() => {
    clearWatchFun();
})

function getCurrentPositionFun() {
    navigator.geolocation.getCurrentPosition(
        success => {
            Snackbar.success("Geolocation success");
            position.value = success;
        },
        error => {
            Snackbar.error(error.message)
            console.log(error);
            // alert("请在系统设置-》位置-》允许应用访问你的位置信息(开启)");
        },
    );
}

function watchPositionFun() {
    clearWatchFun();
    watchId.value = navigator.geolocation.watchPosition(
        success => {
            Snackbar.success("Geolocation success");
            position.value = success;
        },
        error => {
            console.log(error.message);
            // alert("请在系统设置-》位置-》允许应用访问你的位置信息(开启)");
        },
        {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0
        }
    );
}

function clearWatchFun() {
    if (watchId.value > 0) {
        navigator.geolocation.clearWatch(watchId.value);
    }
}

</script>
<template>
    <var-card title="Geolocation">
        <var-cell>{{ position }}</var-cell>
        <var-button type="success" block @click="getCurrentPositionFun">getCurrentPosition</var-button>
        <var-button type="primary" block @click="watchPositionFun">watchPosition</var-button>
        <var-button type="danger" block @click="clearWatchFun">clearWatch</var-button>
    </var-card>
</template>