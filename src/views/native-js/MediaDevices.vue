<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

/**
 * @type {import("vue").Ref<MediaDeviceInfo[]>}
 */
const devices = ref([]);
const constraints = ref();
navigator.mediaDevices.enumerateDevices().then(val => devices.value = val)
constraints.value = navigator.mediaDevices.getSupportedConstraints();

let video, stream;

onMounted(() => video = document.getElementById("DisplayMedia"))

function closeStream() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  video.srcObject = null;
}

function getDisplayMedia() {
  closeStream();
  navigator.mediaDevices.getDisplayMedia({audio: true, video: true}).then(val => {
    stream = val;
    video.srcObject = val;
  }).catch(err => Snackbar.error(err))
}

onUnmounted(closeStream);

</script>
<template>
  <var-card title="MediaDeviceInfo">
    <var-cell v-for="item in devices">{{ item }}</var-cell>
  </var-card>
  <var-card title="SupportedConstraints">{{ constraints }}</var-card>
  <var-card title="DisplayMedia">
    <video id="DisplayMedia" width="100%" height="100%" playsinline autoplay controls/>
    <var-button block type="primary" @click="getDisplayMedia">getDisplayMedia</var-button>
    <var-button block type="danger" @click="closeStream">closeStream</var-button>
  </var-card>
</template>