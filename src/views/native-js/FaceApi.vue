<script setup>
import {nets, detectAllFaces, euclideanDistance, TinyFaceDetectorOptions, detectSingleFace} from 'face-api.js';
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

nets.ssdMobilenetv1.loadFromUri()
// 微型人脸检测器
// nets.tinyFaceDetector.loadFromUri()
// 面对地标68网
nets.faceLandmark68Net.loadFromUri()
// 面对地标68微型网
// nets.faceLandmark68TinyNet.loadFromUri()
// 人脸识别网
// nets.faceRecognitionNet.loadFromUri()
// 面部表情网
nets.faceExpressionNet.loadFromUri()
// 年龄性别网
nets.ageGenderNet.loadFromUri()

let video, stream;
onMounted(() => video = document.getElementById('FaceApiVideo'));
onUnmounted(cancelFace);

const detects = ref();

function getDetects() {
  // console.log("getDetects getDetects getDetects");
  detectAllFaces(video)
      .withFaceLandmarks()    //带有面部标志
      .withFaceExpressions()  //面部表情
      .withAgeAndGender()     //年龄和性别
      // .withFaceDescriptors()  //带有面部描述符
      .then(val => {
        detects.value = val;
        if (video.srcObject) {
          setTimeout(getDetects, 200);
        }
      })
}

function scanFace(facingMode) {
  cancelFace();
  navigator.mediaDevices.getUserMedia({
    video: {facingMode}
  }).then(_stream => {
    stream = _stream;
    video.srcObject = _stream;
  }).catch(error => {
    console.error(error)
    Snackbar.error(error);
  });
}

function cancelFace() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  video.srcObject = null;
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
    <video id="FaceApiVideo" width="100%" height="360px" playsinline autoplay @play="getDetects"/>
    <var-button block type="info" @click="scanFace('environment')">backFace</var-button>
    <var-button block type="primary" @click="scanFace('user')">frontFace</var-button>
    <var-button block type="danger" @click="cancelFace">cancelFace</var-button>
  </var-card>
  <var-card title="FaceCompare">
    <var-uploader id="FaceCompare" v-model="files" :maxlength="2"/>
    <var-button block type="warning" :loading="faceCompareLoading" @click="faceCompare">faceCompare</var-button>
  </var-card>
</template>