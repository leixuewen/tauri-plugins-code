<script setup>
import {
  allSysInfo,
  totalMemory,
  usedMemory,
  totalSwap,
  usedSwap,
  memoryInfo,
  hostname,
  name,
  kernelVersion,
  osVersion,
  staticInfo,
  components,
  cpus,
  cpuCount,
  cpuInfo,
  disks,
  networks,
  processes,
  refreshAll,
  refreshMemory,
  refreshCpu,
  refreshProcesses,
  debugCommand,
  batteries,
  uptime,
  loadAverage,
} from "tauri-plugin-system-info-api";
import {onMounted, ref} from "vue";

const info = ref({
  allSysInfo: {},
  totalMemory: {},
  usedMemory: {},
  totalSwap: {},
  usedSwap: {},
  memoryInfo: {},
  hostname: {},
  name: {},
  kernelVersion: {},
  osVersion: {},
  staticInfo: {},
  components: {},
  cpus: {},
  cpuCount: {},
  cpuInfo: {},
  disks: {},
  networks: {},
  processes: {},
  // refreshAll: {},
  // refreshMemory: {},
  // refreshCpu: {},
  // refreshProcesses: {},
  // debugCommand: {},
  batteries: {},
  uptime: {},
  loadAverage: {},
});

onMounted(() => {
  // allSysInfo().then(val => info.value.allSysInfo = val);
  totalMemory().then(val => info.value.totalMemory = val);
  usedMemory().then(val => info.value.usedMemory = val);
  totalSwap().then(val => info.value.totalSwap = val);
  usedSwap().then(val => info.value.usedSwap = val);
  memoryInfo().then(val => info.value.memoryInfo = val);
  hostname().then(val => info.value.hostname = val);
  name().then(val => info.value.name = val);
  kernelVersion().then(val => info.value.kernelVersion = val);
  osVersion().then(val => info.value.osVersion = val);
  staticInfo().then(val => info.value.staticInfo = val);
  components().then(val => info.value.components = val);
  cpus().then(val => info.value.cpus = val);
  cpuCount().then(val => info.value.cpuCount = val);
  cpuInfo().then(val => info.value.cpuInfo = val);
  disks().then(val => info.value.disks = val);
  networks().then(val => info.value.networks = val);
  // processes().then(val => info.value.processes = val);
  batteries().then(val => info.value.batteries = val);
  uptime().then(val => info.value.uptime = val);
  loadAverage().then(val => info.value.loadAverage = val);
})

</script>
<template>
  <var-card title="SystemInfo">
    <var-cell border v-for="item in Object.keys(info)" :title="item" :description="JSON.stringify(info[item])"/>
  </var-card>
</template>