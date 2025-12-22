<script setup>
import {
  Window,
  CloseRequestedEvent,
  getCurrentWindow,
  getAllWindows,
  LogicalSize,
  PhysicalSize,
  LogicalPosition,
  PhysicalPosition,
  UserAttentionType,
  Effect,
  EffectState,
  currentMonitor,
  monitorFromPoint,
  primaryMonitor,
  availableMonitors,
  cursorPosition
} from "@tauri-apps/api/window";
import {onBeforeMount, ref} from "vue";

const win = ref({
  currentMonitor: {},
  monitorFromPoint: {},
  availableMonitors: {},
  primaryMonitor: {},
  cursorPosition: {},
});

onBeforeMount(() => {
  currentMonitor().then(val => win.value.currentMonitor = val);
  monitorFromPoint(100.0, 200.0).then(val => win.value.monitorFromPoint = val);
  availableMonitors().then(val => win.value.availableMonitors = val);
  primaryMonitor().then(val => win.value.primaryMonitor = val);
  cursorPosition().then(val => win.value.cursorPosition = val);
});

</script>
<template>
  <var-card>
    <var-button block type="primary" @click="getCurrentWindow().center()">center</var-button>
    <var-cell title="currentMonitor" :description="JSON.stringify(win.currentMonitor)"/>
    <var-cell title="monitorFromPoint" :description="JSON.stringify(win.monitorFromPoint)"/>
    <var-cell title="availableMonitors" :description="JSON.stringify(win.availableMonitors)"/>
    <var-cell title="primaryMonitor" :description="JSON.stringify(win.primaryMonitor)"/>
    <var-cell title="cursorPosition" :description="JSON.stringify(win.cursorPosition)"/>
    <var-button block type="success" @click="Window.getFocusedWindow()">getFocusedWindow</var-button>
  </var-card>
</template>