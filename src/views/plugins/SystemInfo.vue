<script setup>
import { allSysInfo } from "tauri-plugin-system-info-api";
import { onMounted, ref } from "vue";

const sysInfo = ref({
    hostname: '',
    kernel_version: '',
    os_version: '',
    name: '',
    total_memory: '',
    used_memory: '',
    total_swap: '',
    used_swap: '',
    cpus: '',
    cpu_count: '',
    disks: '',
    networks: '',
    components: '',
    processes: '[]',
    batteries: '',
});

onMounted(() => {
    allSysInfo().then(val => {
        sysInfo.value.hostname = val.hostname;
        sysInfo.value.kernel_version = val.kernel_version;
        sysInfo.value.os_version = val.os_version;
        sysInfo.value.name = val.name;
        sysInfo.value.total_memory = val.total_memory + '';
        sysInfo.value.used_memory = val.used_memory + '';
        sysInfo.value.total_swap = val.total_swap + '';
        sysInfo.value.used_swap = val.used_swap + '';
        sysInfo.value.cpus = JSON.stringify(val.cpus);
        sysInfo.value.cpu_count = val.cpu_count + '';
        sysInfo.value.disks = JSON.stringify(val.disks);
        sysInfo.value.networks = JSON.stringify(val.networks);
        sysInfo.value.components = JSON.stringify(val.components);
        // sysInfo.value.processes = JSON.stringify(val.processes);
        sysInfo.value.batteries = JSON.stringify(val.batteries);
    })
})

</script>
<template>
    <var-card title="SystemInfo">
        <var-cell border v-for="item in Object.keys(sysInfo)" :title="item" :description="sysInfo[item]" />
    </var-card>
</template>