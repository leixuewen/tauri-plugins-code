<route>
{meta: {
description: "Get and track current device positon",
}}
</route>
<script setup>
import {
    checkPermissions,
    requestPermissions,
    getCurrentPosition,
    watchPosition,
    clearWatch,
} from '@tauri-apps/plugin-geolocation'
import { onMounted, onUnmounted, ref } from 'vue'
import { Snackbar } from '@varlet/ui';
import { Channel, invoke } from '@tauri-apps/api/core';

const pos = ref();
const location = ref("");
const channelId = ref(0);

onMounted(() => {
    checkPermissions().then(val => {
        if (val.location === 'prompt' || val.location === 'prompt-with-rationale') {
            return requestPermissions(['location']);
        }
        return Promise.resolve(val);
    }).then(val => {
        location.value = val.location;
    }).catch(err => {
        Snackbar.error(err);
    });
});

onUnmounted(() => {
    clearWatchFun();
})

function geolocationFun() {
    getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    }).then(val => {
        Snackbar.success("geolocation success");
        pos.value = val;
    }).catch(err => {
        Snackbar.error(err);
    });
}

async function watchPositionFun() {
    try {
        channelId.value = await watchPositions({
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0
        }, val => {
            pos.value = val;
            Snackbar.info("watchPosition : " + JSON.stringify(val));
        });
        // console.log(channelId.value);
    } catch (err) {
        Snackbar.error(err);
    }
}

// Override the default watchPosition
// Override the default watchPosition
// Override the default watchPosition
async function watchPositions(options, cb) {
    const channel = new Channel();
    channel.onmessage = (message) => {
        if (typeof message === 'string') {
            cb(null, message);
        }
        else {
            cb(message);
        }
    };
    invoke('plugin:geolocation|watch_position', {
        options,
        channel
    });
    return channel.id;
}

function clearWatchFun() {
    if (channelId.value > 0) {
        clearWatch(channelId.value).catch(err => {
            Snackbar.error(err);
        });
        channelId.value = 0;
    }
}

</script>
<template>
    <var-card :title="'Geolocation: ' + location">
        <var-cell>{{ pos }}</var-cell>
        <var-button type="success" block @click="geolocationFun">geolocation</var-button>
        <var-button type="warning" :disabled="channelId > 0" block @click="watchPositionFun">
            watchPosition {{ channelId }}
        </var-button>
        <var-button type="danger" block @click="clearWatchFun">clearWatch {{ channelId }}</var-button>
    </var-card>
</template>