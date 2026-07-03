<script setup>
import {nets, detectAllFaces, euclideanDistance, TinyFaceDetectorOptions, detectSingleFace} from 'face-api.js';
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {appCacheDir, join} from "@tauri-apps/api/path";
import {mkdir, readDir, writeFile, writeTextFile} from "@tauri-apps/plugin-fs";


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

let dir;
appCacheDir().then(v => join(v, "face-api.js")).then(v => {
  dir = v;
  console.log(v);
  return mkdir(v, {recursive: true})
}).then(async () => {
  let list = await readDir(dir);
  if (list.length <= 0) {
    await downloadFaceData()
  }
  loadFaceData()
}).catch(err => Snackbar.error(err));

async function downloadFaceData() {
  Snackbar.loading("face-api.js nets downloading...");
  let uri = "https://gh.llkk.cc/https://github.com/justadudewhohacks/face-api.js-models/blob/master/";
  let _ext = "_model-weights_manifest.json";
  return Promise.all(
      [
        'age_gender_model',
        'face_expression',
        'face_landmark_68',
        'face_landmark_68_tiny',
        'face_recognition',
        'mtcnn',
        'ssd_mobilenetv1',
        'tiny_face_detector',
        'tiny_yolov2',
        'tiny_yolov2_separable_conv',
        // 'proto',
        // 'uncompressed',
      ].map(async m => {
            let _m = m.replace('_model', '');
            let data = await (await fetch(`${uri}${m}/${_m}${_ext}`)).json();
            await writeTextFile(`${dir}/${_m}${_ext}`, JSON.stringify(data))
            for (let path of data[0].paths) {
              await writeFile(`${dir}/${path}`, await (await fetch(`${uri}${m}/${path}`)).bytes());
            }
          }
      )
  ).then(() => Snackbar.success("face-api.js nets downloaded"))
      .catch(err => Snackbar.error(err))
}

function loadFaceData() {
  if (sessionStorage.getItem(location.href)) return;
  Snackbar.loading("face-api.js nets loading...")
  let uri =
// #if VITE_desktop_windows || VITE_mobile_android
      `http://asset.localhost/${dir}`
// #elif VITE_desktop_linux || VITE_desktop_macos || VITE_mobile_ios
      `asset://localhost/${dir}`
// #endif
  Promise.all([
    nets.ssdMobilenetv1.loadFromUri(uri),
// 微型人脸检测器
// nets.tinyFaceDetector.loadFromUri(uri),
// nets.tinyYolov2.loadFromUri(uri),
// nets.mtcnn.loadFromUri(uri),
// 面对地标68网
    nets.faceLandmark68Net.loadFromUri(uri),
// 面对地标68微型网
// nets.faceLandmark68TinyNet.loadFromUri(uri),
// 人脸识别网
// nets.faceRecognitionNet.loadFromUri(uri),
// 面部表情网
    nets.faceExpressionNet.loadFromUri(uri),
// 年龄性别网
    nets.ageGenderNet.loadFromUri(uri),
  ]).then(() => {
    sessionStorage.setItem(location.href, 1);
    Snackbar.success("face-api.js nets loaded")
  }).catch(err => Snackbar.error(err))
}

</script>

<template>
  <var-card title="FaceApi">
    <var-button style="position: absolute; top: 9px; right:0" type="danger"
                @click="downloadFaceData" text>
      重新下载模型
    </var-button>
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