<script setup>
import {
    getCurrentWindow, currentMonitor, monitorFromPoint,
    primaryMonitor, availableMonitors, cursorPosition
} from "@tauri-apps/api/window";
import { onBeforeMount, ref } from "vue";

const win = ref(getCurrentWindow());
const window = ref({
    currentMonitor: '',
    monitorFromPoint: '',
    primaryMonitor: '',
    cursorPosition: '',
});

onBeforeMount(async () => {
    window.value.currentMonitor = await currentMonitor();
    window.value.monitorFromPoint = await monitorFromPoint(100.0, 200.0);
    window.value.primaryMonitor = await primaryMonitor();
    window.value.availableMonitors = await availableMonitors();
    window.value.cursorPosition = await cursorPosition();
});

win.value.once("tauri://created", () => {
    // window successfully created
    console.log("window successfully created");
});
win.value.once("tauri://error", (e) => {
    // an error happened creating the window
    console.log(e);
});

</script>
<template>
    <var-card>
        <var-button block type="primary" @click="win.center()">center</var-button>
        <var-cell title="currentMonitor" :description="JSON.stringify(window.currentMonitor)" />
        <var-cell title="monitorFromPoint" :description="JSON.stringify(window.monitorFromPoint)" />
        <var-cell title="availableMonitors" :description="JSON.stringify(window.availableMonitors)" />
        <var-cell title="cursorPosition" :description="JSON.stringify(window.cursorPosition)" />
    </var-card>
</template>