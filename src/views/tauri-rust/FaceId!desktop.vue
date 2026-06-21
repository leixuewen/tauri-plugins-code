<route>
{meta: {
description: "Face detection (bounding boxes, eyes/nose/mouth markers), and facial recognition (embeddings).",
}}
</route>
<script setup>
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {invoke} from "@tauri-apps/api/core";
import {mkdir, readDir, remove, writeFile} from "@tauri-apps/plugin-fs";
import {appDataDir, join, sep} from "@tauri-apps/api/path";

const path = ref();
const modelsFiles = ref([]);
onBeforeMount(() => {
  appDataDir().then(val => join(val, 'models', 'face')) // 拼接目录
      .then(val => {
        path.value = val; // 模型存放目录
        return mkdir(val, {recursive: true}) // (不存在就)创建目录
      })
      .then(() => readDir(path.value)) // 读取模型文件
      .then(val => {
        console.log(val);
        modelsFiles.value = val;
        if (val.length === 0) {
          return Promise.reject("No found face models");
        }
        // 初始化模型对象
        return invoke("face_id_init", {models: val.map(m => `${path.value}${sep()}${m.name}`)})
      }).then(() => Snackbar.success("face_id init models success"))
      .catch(err => Snackbar.error(err));
})

let video, canvas, stream;
onMounted(() => {
  video = document.getElementById('FaceVideo');
  canvas = document.getElementById('FaceCanvas');
});

// 打开摄像头显示数据
function camera(facingMode) {
  close();
  navigator.mediaDevices.getUserMedia({
    video: {facingMode}
  }).then(_stream => {
    stream = _stream;
    video.srcObject = stream;
    setTimeout(faceIdVideo, 200)
  }).catch(error => {
    console.error(error)
    Snackbar.error(error);
  });
}

// 截取图片给后端
function faceIdVideo() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清理
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 绘制
  // canvas.toDataURL("image/png");
  canvas.toBlob((blob) => { // 获取图片数据
    if (blob) {
      // blob.text()
      blob.arrayBuffer()
          .then(buffer => invoke("face_id_analyzer", {buffer}))
          .then(val => {
            console.log(val)
            Snackbar.success(JSON.stringify(val));
            if (val.length === 0) { // 没有获取到人脸信息就 延迟200ms 后再次检查
              setTimeout(faceIdVideo, 200)
            }
          })
          .catch(err => Snackbar.error(err));
    }
  });
}

onBeforeUnmount(close);

function close() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
}

const file_id = "import-models-file";

function importModels(onnx) {
  let el = document.getElementById(file_id);
  if (!el) {
    el = document.createElement("input");
    el.type = "file";
    el.hidden = true;
    el.accept = ".onnx";
    el.onchange = (e) => {
      let _path = `${path.value}/${onnx}`;
      Snackbar.loading(`import ${onnx}`);
      writeFile(_path, e.target.files[0].stream())
          .then(() => Snackbar.success("import success"))
          .finally(() => document.body.appendChild(el))
    };
    document.body.appendChild(el);
  }
  el.click();
}

function cleanModel() {
  window.confirm("clean model ???").then(val => {
    console.log(val);
  })
}
</script>

<template>
  <var-card title="face_id">
    <video id="FaceVideo" width="100%" height="360px" playsinline autoplay poster="/src/assets/tauri.svg"/>
    <canvas id="FaceCanvas" width="500px" height="360px" hidden="hidden"/>
    <var-button block type="success" @click="camera('environment')">camera back</var-button>
    <var-button block type="info" @click="camera('user')">camera front</var-button>
    <var-button block type="warning" @click="close">close camera</var-button>
  </var-card>
  <var-card title="local models (.onnx)">
    <var-button v-for="item in ['det_model.onnx', 'rec_model.onnx', 'attr_model.onnx']"
                @click="importModels(item)" block type="primary">
      {{ item }} {{ modelsFiles.find(f => f.name === item) }}
    </var-button>
    <var-button block type="danger" @dblclick="remove(path, {recursive: true})">clean model</var-button>
  </var-card>
</template>