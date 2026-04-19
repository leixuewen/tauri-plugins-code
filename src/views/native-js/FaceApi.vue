<script setup>
import {nets, detectAllFaces, euclideanDistance, TinyFaceDetectorOptions, detectSingleFace} from 'face-api.js';
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

nets.ssdMobilenetv1.loadFromUri("/face-api/models")
// 微型人脸检测器
nets.tinyFaceDetector.loadFromUri("/face-api/models")
// 面对地标68网
nets.faceLandmark68Net.loadFromUri("/face-api/models")
// 面对地标68微型网
nets.faceLandmark68TinyNet.loadFromUri("/face-api/models")
// 人脸识别网
nets.faceRecognitionNet.loadFromUri("/face-api/models")
// 面部表情网
nets.faceExpressionNet.loadFromUri("/face-api/models")
// 年龄性别网
nets.ageGenderNet.loadFromUri("/face-api/models")

let stream, interval;
onUnmounted(() => {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    clearInterval(interval);
  }
});

let video;
onMounted(() => {
  video = document.getElementById('FaceApiVideo');
});

const detects = ref();

function scanCode(_facingMode) {
  cancelScanCode();
  navigator.mediaDevices.getUserMedia({
    video: {facingMode: _facingMode}
  }).then(_stream => {
    stream = _stream;
    video.srcObject = _stream;
    interval = setInterval(() => {
      detectAllFaces(video)
          .withFaceLandmarks()    //带有面部标志
          .withFaceExpressions()  //面部表情
          .withAgeAndGender()     //年龄和性别
          // .withFaceDescriptors()  //带有面部描述符
          .then(val => detects.value = val)
    }, 200); // 每200ms处理一次；
  }).catch(error => {
    console.error(error)
    Snackbar.error(error);
  });
}

function cancelScanCode() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  video.srcObject = null;
  clearInterval(interval);
}

const files = ref([]);
const faceCompareLoading = ref(false);

async function faceCompare() {
  let faceImg = document.getElementById("FaceCompare").getElementsByTagName("img");
  if (faceImg.length !== 2) {
    return alert("two img face compare");
  }

  faceCompareLoading.value = true;
  let desc1 = await detectSingleFace(faceImg[0]).withFaceLandmarks().withFaceDescriptor()
  if (!desc1) {
    return alert("img 1 no face");
  }
  console.log(desc1)
  let desc2 = await detectSingleFace(faceImg[1]).withFaceLandmarks().withFaceDescriptor()
  if (!desc2) {
    return alert("img 2 no face");
  }
  console.log(desc2)
  let rest = euclideanDistance(desc1.descriptor, desc2.descriptor);
  faceCompareLoading.value = false;

  alert(`FaceCompare => score:${(1 - rest).toFixed(4)}, distance:${rest.toFixed(4)}`);
}
</script>

<template>
  <var-card title="FaceApi">
    <div style="position: absolute;z-index:9;pointer-events: none">{{ detects }}</div>
    <video id="FaceApiVideo" width="100%" height="360px" playsinline autoplay/>
    <var-button block type="info" @click="scanCode('environment')">backFace</var-button>
    <var-button block type="primary" @click="scanCode('user')">frontFace</var-button>
    <var-button block type="danger" @click="cancelScanCode">cancelFace</var-button>
  </var-card>
  <var-card title="FaceCompare">
    <var-uploader id="FaceCompare" v-model="files" :maxlength="2"/>
    <var-button block type="warning" :loading="faceCompareLoading" @click="faceCompare">faceCompare</var-button>
  </var-card>
</template>