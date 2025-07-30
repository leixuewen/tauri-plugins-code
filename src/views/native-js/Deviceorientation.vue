<script setup>
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const deviceorientation = ref({
    absolute: false,
    alpha: null,
    beta: null,
    gamma: null,
});
const devicemotion = ref({
    interval: 0,
    acceleration: null,
    rotationRate: null,
    accelerationIncludingGravity: null,
});

function deviceorientationFun(event) {
    // console.log(event);
    deviceorientation.value = event;
}

function devicemotionFun(event) {
    // console.log(event);

    // console.log(event.interval);
    devicemotion.value.interval = event.interval;

    // console.log(event.accelerationIncludingGravity);
    devicemotion.value.accelerationIncludingGravity = JSON.stringify({
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z,
    });

    // console.log(event.acceleration);
    devicemotion.value.acceleration = JSON.stringify({
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
    });

    // console.log(event.rotationRate);
    devicemotion.value.rotationRate = JSON.stringify({
        alpha: event.rotationRate.alpha,
        beta: event.rotationRate.beta,
        gamma: event.rotationRate.gamma,
    });
}


function debounce(name, fn, delay) {
    let time = window["__debounce_" + name];
    if (!time) {
        time = new Date().getTime();
    }
    if ((time + delay) > new Date().getTime()) {
        fn();
    }
}

onBeforeMount(() => {
    let delay = 500;
    let deviceorientationEvent, isDeviceorientation = true;
    addEventListener("deviceorientation", event => {
        deviceorientationEvent = event;
        if (isDeviceorientation) {
            setTimeout(() => {
                deviceorientationFun(deviceorientationEvent);
                isDeviceorientation = true;
            }, delay);
            isDeviceorientation = false;
        }
    }, true);
    let devicemotionEvent, isDevicemotion = true;
    addEventListener("devicemotion", event => {
        devicemotionEvent = event;
        if (isDevicemotion) {
            setTimeout(() => {
                devicemotionFun(devicemotionEvent);
                isDevicemotion = true;
            }, delay);
            isDevicemotion = false;
        }
    }, true);
});

onUnmounted(() => {
    removeEventListener("deviceorientation", () => { });
    removeEventListener("devicemotion", () => { });
})
</script>
<template>
    <var-card title="DeviceOrientation">
        <var-cell title="absolute" :description="deviceorientation.absolute + ''" />
        <var-cell title="alpha" :description="deviceorientation.alpha + ''" />
        <var-cell title="beta" :description="deviceorientation.beta + ''" />
        <var-cell title="gamma" :description="deviceorientation.gamma + ''" />
    </var-card>
    <var-card title="DeviceMotion">
        <var-cell title="acceleration" :description="devicemotion.acceleration" />
        <var-cell title="accelerationIncludingGravity" :description="devicemotion.accelerationIncludingGravity" />
        <var-cell title="interval" :description="devicemotion.interval + ''" />
        <var-cell title="rotationRate" :description="devicemotion.rotationRate" />
    </var-card>
</template>