<script setup>
import {Snackbar} from '@varlet/ui';
import imgUrl from '../../assets/vue.svg';
import {h} from "vue";

let a = {a: {b: {c: new Date().toLocaleString()}}};
let b = {};

function structuredClone() {
  b = window.structuredClone(a)
}

function reportError() {
  window.onerror = (message, source, lineno, colno, error) => {
    console.info(message, source, lineno, colno, error);
    console.error(`消息：${error.message}，行号：${lineno}`);
    return true;
  };
  window.addEventListener("error", (error) => {
    console.error(error);
  });
  window.reportError(new Error("Some error message", "someFile.js", 11));
  setTimeout(() => {
    window.onerror = null;
    window.removeEventListener('error', undefined);
  }, 300);
}

function queueMicrotask() {
  window.queueMicrotask(() => {
    Snackbar.info('queueMicrotask queueMicrotask queueMicrotask')
  });
}

function requestIdleCallback() {
  window.requestIdleCallback(IdleDeadline => {
    Snackbar.success(`didTimeout: ${IdleDeadline.didTimeout}, timeRemaining:${IdleDeadline.timeRemaining()}`)
  }, {timeout: 3000});
  // cancelIdleCallback
}

function matchMedia() {
  let mql = window.matchMedia("(max-width: 600px)");
  console.log(mql);
  Snackbar.info(mql.media);
}

function getSelection() {
  let selection = window.getSelection();
  console.log(selection);
  Snackbar.info(selection.anchorNode?.data);
}

function getComputedStyle(e) {
  let css = window.getComputedStyle(e.target);
  Snackbar.warning(JSON.stringify(css));
}

// #if !VITE_mobile_android
function speechSynthesis() {
  let synth = window.speechSynthesis;
  let voices = synth.getVoices();
  console.log(voices);
  let content = randomChineseGBK(99);
  Snackbar({type: "success", content, duration: 9000,});
  let utterThis = new SpeechSynthesisUtterance(content);
  utterThis.voice = voices[Math.floor(Math.random() * voices.length)]; // 设置语音[随机取数]
  synth.speak(utterThis);
}

function randomChineseGBK(len) {
  const decoder = new TextDecoder('gb2312');
  let result = '';
  for (let i = 0; i < len; i++) {
    const head = Math.floor(Math.random() * (0xF7 - 0xB0 + 1)) + 0xB0;
    const body = Math.floor(Math.random() * (0xFE - 0xA1 + 1)) + 0xA1;
    const buf = new Uint8Array([head, body]);
    result += decoder.decode(buf);
  }
  return result;
}
// #endif

function requestAnimationFrame() {
  let start = null;
  let el = document.getElementById('requestAnimationFrame');

  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    el.style.transform = 'translateX(' + Math.min(progress / 10, 500) + 'px)';
    if (progress < 5000) {
      window.requestAnimationFrame(step);
    } else {
      el.style.transform = "";
    }
  }

// cancelAnimationFrame(id)
  window.requestAnimationFrame(step);
}

function createImageBitmap() {
  Snackbar({
    content: h("canvas", {id: "createImageBitmap"}),
  })
  let image = new Image();
  image.onload = () => {
    let ctx = document.getElementById("createImageBitmap").getContext("2d");
    window.createImageBitmap(image, 0, 0, 32, 32).then(img => {
      ctx.drawImage(img, 0, 0);
    });
    window.createImageBitmap(image, 32, 0, 32, 32).then(img => {
      ctx.drawImage(img, 32, 32);
    });
    window.createImageBitmap(image, 0, 0, 50, 50, {imageOrientation: "flipY"}).then(img => {
      ctx.drawImage(img, 64, 64);
    });
  }
  image.src = imgUrl;
}

function getVal(name) {
  return window[name];
}
</script>

<template>
  <var-card>
    <var-button block type="success" @click="structuredClone">structuredClone({{ a }}) ==> {{ b }}</var-button>
    <var-button block type="info" @click="reportError">reportError(Error)</var-button>
    <var-button block type="primary" @click="queueMicrotask">queueMicrotask(()=>{})</var-button>
    <var-button block type="warning" @click="createImageBitmap">createImageBitmap</var-button>
    <var-button block>origin => {{ getVal('origin') }}</var-button>
    <var-button block>isSecureContext => {{ getVal('isSecureContext') }}</var-button>
    <var-button block>crossOriginIsolated => {{ getVal('crossOriginIsolated') }}</var-button>
    <var-button block type="primary" id="requestAnimationFrame" @click="requestAnimationFrame">requestAnimationFrame
    </var-button>
    <var-button block type="warning" @click="requestIdleCallback">requestIdleCallback</var-button>
    <var-button block type="info" @click="matchMedia">matchMedia</var-button>
    <var-button block type="primary" @click="getSelection">getSelection</var-button>
    <var-button block type="warning" @click="getComputedStyle">getComputedStyle</var-button>
    // #if !VITE_mobile_android
    <var-button block type="danger" @click="speechSynthesis">speechSynthesis</var-button>
    // #endif
  </var-card>
</template>