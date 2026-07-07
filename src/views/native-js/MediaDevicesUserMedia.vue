<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {Snackbar} from '@varlet/ui';
import {BarcodeDetector} from "barcode-detector/ponyfill";

let stream, stream1, interval;
onUnmounted(() => {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        clearInterval(interval);
    }
    if (stream1) {
        stream1.getTracks().forEach(t => t.stop());
    }
    mediaClose();
});

let video;
onMounted(() => {
    video = document.getElementById('ScanCodeVideo');
});

function torch(_stream, _bool) {
    _stream.getVideoTracks()[0].applyConstraints({
        advanced: [{ torch: _bool }]
    });
}

function openTorch() {
    if (stream) {
        torch(stream, true);
        return;
    }
    if (stream1) {
      torch(stream1, true);
      return;
    }
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    }).then(_stream => {
        stream1 = _stream;
        torch(_stream, true);
    }).catch(error => {
        console.error(error)
        Snackbar.error(error);
    });
}

function closeTorch() {
    if (stream) {
        torch(stream, false);
    }
    if (stream1) {
        stream1.getTracks().forEach(t => t.stop());
        stream1 = null;
    }
}

function scanCode(_facingMode) {
    cancelScanCode();
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: _facingMode }
    }).then(_stream => {
        stream = _stream;
        video.srcObject = _stream;
        interval = setInterval(barcodeDetectorVideo, 200); // 每200ms处理一次；
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

let barcodeDetector;
const barcodeFormats = ref([]);
BarcodeDetector.getSupportedFormats().then(formats => {
  // console.log(JSON.stringify(formats));
  barcodeFormats.value = formats;
  barcodeDetector = new BarcodeDetector({formats});
});

function barcodeDetectorVideo() {
    barcodeDetector.detect(video).then((barcodes) => {
        // console.log(barcodes);
        if (barcodes.length > 0) {
            cancelScanCode();
            alert(JSON.stringify(barcodes));
        }
    }).catch((err) => {
        console.log(err);
        Snackbar.error(err);
    });
}

const media = ref({
  video: true,
  audio: false,
  playUrl: "",
  recorder: undefined,
});

function mediaStart() {
  cancelScanCode();
  navigator.mediaDevices.getUserMedia({
    video: media.value.video,
    audio: media.value.audio,
  }).then(val => {
    stream = val;
    video.srcObject = val;
    let data = [], mr = new MediaRecorder(val);
    mr.ondataavailable = ev => {
      data.push(ev.data);
    }
    mr.onstop = () => {
      if (data.length > 0) {
        URL.revokeObjectURL(media.value.playUrl); // 清理旧数据
        let d = new Blob(data);
        media.value.playUrl = URL.createObjectURL(d);
        Snackbar.info(`MediaRecorder data size ${(d.size / 1024).toFixed(2)} KB`);
      } else {
        Snackbar.error("MediaRecorder data is empty");
      }
    }
    mr.start(1000);
    media.value.recorder = mr;
  }).catch((err) => {
    console.error(err);
    Snackbar.error(err);
  });
}

function mediaStop() {
  video.src = undefined;
  if (media.value.recorder && media.value.recorder.state !== "inactive") {
    media.value.recorder.stop();
  }
  cancelScanCode();
}

function mediaPlay() {
  mediaStop();
  setTimeout(() => {
    if (media.value.playUrl) {
      video.src = media.value.playUrl;
    }
  }, 200);
}

function mediaClose() {
  mediaStop();
  media.value.playUrl = "";
  media.value.recorder = undefined;
  URL.revokeObjectURL(media.value.playUrl);
}

</script>
<template>
  <var-card title="MediaRecorder">
    <var-cell>
      video
      <var-switch v-model="media.video"/>
      Audio
      <var-switch v-model="media.audio"/>
    </var-cell>
    <div style="display: flex">
      <var-button block type="success" @click="mediaStart">Start</var-button>
      <var-button block type="warning" @click="mediaStop">Stop</var-button>
      <var-button block type="primary" @click="mediaPlay">Play</var-button>
      <var-button block type="danger" @click="mediaClose">Close</var-button>
    </div>
  </var-card>
  <video id="ScanCodeVideo" width="100%" height="360px" playsinline autoplay poster="/src/assets/tauri.svg"/>
    <var-card title="ScanCode">
        <var-button block type="success" @click="scanCode('environment')">backScanCode</var-button>
        <var-button block type="info" @click="scanCode('user')">frontScanCode</var-button>
        <var-button block type="danger" @click="cancelScanCode">cancelScanCode</var-button>
    </var-card>
    <var-card title="BarcodeFormat">
      <var-chip v-for="item in barcodeFormats">{{ item }}</var-chip>
    </var-card>
    <var-card title="Torch">
        <var-button block type="success" @click="openTorch">openTorch</var-button>
        <var-button block type="danger" @click="closeTorch">closeTorch</var-button>
    </var-card>
</template>