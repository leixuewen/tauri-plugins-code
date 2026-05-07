<script setup>
import {Snackbar} from '@varlet/ui';
import {onUnmounted, ref} from 'vue';

const position = ref();
const options = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 0,
};

onUnmounted(clearWatchFun)

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
      options,
  );
}

let watchId;

function watchPositionFun() {
  clearWatchFun();
  watchId = navigator.geolocation.watchPosition(
      success => {
        Snackbar.success("Geolocation success");
        position.value = success;
      },
      error => {
        console.log(error.message);
        // alert("请在系统设置-》位置-》允许应用访问你的位置信息(开启)"); win10
        // alert("请在系统设置-》隐私和安全性-》位置-》定位服务(开启)"); win11
      },
      options,
  );
}

function clearWatchFun() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
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