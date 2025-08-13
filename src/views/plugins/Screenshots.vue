<script setup>
import {
    getScreenshotableWindows,
    getScreenshotableMonitors,
    getWindowScreenshot,
    getMonitorScreenshot,
    removeWindowScreenshot,
    removeMonitorScreenshot,
    clearScreenshots,
} from "tauri-plugin-screenshots-api";
import { onMounted, onUnmounted, ref } from "vue";
import { Snackbar } from '@varlet/ui';

onMounted(() => {
    getScreenshotableWindow();
    getScreenshotableMonitor();
});
onUnmounted(() => {
    clearScreenshots();
});

const screenshotableWindows = ref([]);
function getScreenshotableWindow() {
    getScreenshotableWindows().then(val => {
        console.log(val);
        screenshotableWindows.value = val;
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}

const screenshotableMonitors = ref([]);
function getScreenshotableMonitor() {
    getScreenshotableMonitors().then(val => {
        console.log(val);
        screenshotableMonitors.value = val;
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}

function getWindowScreenshots() {
    getWindowScreenshot(screenshotableWindows.value[screenshotableWindows.value.length - 1].id).then(val => {
        console.log(val);
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}


function getMonitorScreenshots() {
    getMonitorScreenshot(screenshotableMonitors.value[0].id).then(val => {
        console.log(val);
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}

function removeWindowScreenshots() {
    removeWindowScreenshot(screenshotableWindows.value[0].id).then(val => {
        console.log(val);
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}


function removeMonitorScreenshots() {
    removeMonitorScreenshot(screenshotableMonitors.value[0].id).then(val => {
        console.log(val);
    }).catch(err => {
        Snackbar.error('Screenshots Error : ' + err);
    });
}

</script>
<template>
    <var-card title="GetScreenshotable">
        <var-cell v-for="item in screenshotableWindows" :key="item.id" :title="item.appName" :description="item.name" />
        <var-button type="success" block @click="getScreenshotableWindow">getScreenshotableWindows</var-button>
        <var-cell v-for="item in screenshotableMonitors" :key="item.id" :title="item.name" />
        <var-button type="primary" block @click="getScreenshotableMonitor">getScreenshotableMonitors</var-button>
    </var-card>
    <var-card title="GetScreenshots">
        <var-button type="info" block @click="getWindowScreenshots">getWindowScreenshot</var-button>
        <var-button type="primary" block @click="getMonitorScreenshots">getMonitorScreenshot</var-button>
    </var-card>
    <var-card title="removeScreenshots">
        <var-button type="success" block @click="removeWindowScreenshots">removeWindowScreenshot</var-button>
        <var-button type="warning" block @click="removeMonitorScreenshots">removeMonitorScreenshot</var-button>
        <var-button type="danger" block @click="clearScreenshots">clearScreenshots</var-button>
    </var-card>
</template>