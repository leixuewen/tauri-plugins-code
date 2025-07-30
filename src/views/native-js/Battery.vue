<script setup>
import { onMounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const battery = ref({
    level: Number,
    charging: Boolean,
    chargingTime: Number,
    dischargingTime: Number,
});

onMounted(() => {
    navigator.getBattery().then(_battery => {
        battery.value = _battery;
        console.log(_battery);
        _battery.onchargingchange = onchargingchange;
        _battery.onchargingtimechange = onchargingtimechange;
        _battery.ondischargingtimechange = ondischargingtimechange;
        _battery.onlevelchange = onlevelchange;
        updateAllBatteryInfo();
    }).catch(err => {
        Snackbar.error(err);
    });
})

function updateAllBatteryInfo() {
    onchargingchange();
    onchargingtimechange();
    ondischargingtimechange();
    onlevelchange();
}

function onlevelchange() {
    console.log(`电池电量：${battery.value.level * 100}%`);
}

function onchargingchange() {
    console.log(`电池是否充电中？${battery.value.charging ? "是" : "否"}`);
}

function onchargingtimechange() {
    console.log(`电池充电时间：${battery.value.chargingTime}秒`);
}

function ondischargingtimechange() {
    console.log(`电池续航时间：${battery.value.dischargingTime}秒`);
}

</script>
<template>
    <var-card>
        <var-cell title="level" :description="battery.level + ''" />
        <var-cell title="charging" :description="battery.charging + ''" />
        <var-cell title="chargingTime" :description="battery.chargingTime + ''" />
        <var-cell title="dischargingTime" :description="battery.dischargingTime + ''" />
    </var-card>
</template>