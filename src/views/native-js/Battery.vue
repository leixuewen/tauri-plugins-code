<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const batteryInfo = ref({
    level: '',
    charging: '',
    chargingTime: '',
    dischargingTime: '',
});

let battery;
onMounted(() => {
    navigator.getBattery().then(_battery => {
        // console.log(_battery);
        battery = _battery;
        _battery.onchargingchange = onchargingchange;
        _battery.onchargingtimechange = onchargingtimechange;
        _battery.ondischargingtimechange = ondischargingtimechange;
        _battery.onlevelchange = onlevelchange;
        updateAllBatteryInfo(battery);
    }).catch(err => {
        Snackbar.error(err);
    });
})

onUnmounted(() => {
    battery.onchargingchange = null;
    battery.onchargingtimechange = null;
    battery.ondischargingtimechange = null;
    battery.onlevelchange = null;
});

function updateAllBatteryInfo(_battery) {
    batteryInfo.value.level = _battery.level + '';
    batteryInfo.value.charging = _battery.charging + '';
    batteryInfo.value.chargingTime = _battery.chargingTime + '';
    batteryInfo.value.dischargingTime = _battery.dischargingTime + '';
}

function onlevelchange(e) {
    let _battery = e.target;
    updateAllBatteryInfo(_battery);
    let msg = `level: ${_battery.level * 100}%`;
    console.info(msg);
    Snackbar.info(msg);
}

function onchargingchange(e) {
    let _battery = e.target;
    updateAllBatteryInfo(_battery);
    let msg = `charging: ${_battery.charging ? "yes" : "no"}`;
    console.info(msg);
    Snackbar.info(msg);
}

function onchargingtimechange(e) {
    let _battery = e.target;
    updateAllBatteryInfo(_battery);
    let msg = `chargingTime: ${_battery.chargingTime}`;
    console.info(msg);
    Snackbar.info(msg);
}

function ondischargingtimechange(e) {
    let _battery = e.target;
    updateAllBatteryInfo(_battery);
    let msg = `dischargingTime: ${_battery.dischargingTime}`;
    console.info(msg);
    Snackbar.info(msg);
}

</script>
<template>
    <var-card>
        <var-cell title="level" :description="batteryInfo.level" />
        <var-cell title="charging" :description="batteryInfo.charging" />
        <var-cell title="chargingTime" :description="batteryInfo.chargingTime" />
        <var-cell title="dischargingTime" :description="batteryInfo.dischargingTime" />
    </var-card>
</template>