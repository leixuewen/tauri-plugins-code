<script setup>
import {Snackbar} from "@varlet/ui";

function share() {
  navigator.share(dataShare);
}

function sendBeacon() {
  navigator.sendBeacon("/sendBeacon-post", {});
}

function requestMediaKeySystemAccess() {
  let clearKeyOptions = [
    {
      initDataTypes: ["keyids", "webm"],
      audioCapabilities: [
        {contentType: 'audio/webm; codecs="opus"'},
        {contentType: 'audio/webm; codecs="vorbis"'},
      ],
      videoCapabilities: [
        {contentType: 'video/webm; codecs="vp9"'},
        {contentType: 'video/webm; codecs="vp8"'},
      ],
    },
  ];
  navigator.requestMediaKeySystemAccess("org.w3.clearkey", clearKeyOptions).then(val => {
    console.log(val);
    let j = {};
    j.keySystem = val.keySystem;
    j.config = val.getConfiguration();
    Snackbar.success(JSON.stringify(j));
    // val.createMediaKeys();
  }).catch(err => Snackbar.error(err))
}

function requestMIDIAccess() {
  navigator.requestMIDIAccess().then(access => {
    console.log(access);
    Snackbar.success(`sysexEnabled: ${access.sysexEnabled}`);
  });
}

function getGamepads() {
  let gamepads = navigator.getGamepads();
  // console.log(gamepads);
  Snackbar.info(gamepads.map(m => {
    // console.log(m);
    return m ? `${m.index}-${m.id}-${m.connected}-${m.timestamp}
    {buttons:${m.buttons.length},axes:${m.axes.length}}` : 'null'
  }).join(' '));
}

let dataShare = {
  text: "tauri-api native-js tauri-plugins",
  url: "https://github.com/leixuewen/tauri-plugins-code",
}

function canShare() {
  let bool = navigator.canShare(dataShare);
  if (bool) {
    navigator.share(dataShare);
  } else {
    Snackbar.warning("Not supported share")
  }
}

function wakeLock() {
  navigator.wakeLock.request("screen").then(lock => {
    Snackbar.success("The on-screen wake-up lock is activated");
    lock.addEventListener("release", () => {
      Snackbar.info("The on-screen wake-up lock is released");
    });
    setTimeout(() => {
      return lock.release()
    }, 6000);
  }).catch(err => Snackbar.error(err));
}

function userActivation() {
  return {
    isActive: navigator.userActivation.isActive,
    hasBeenActive: navigator.userActivation.hasBeenActive,
  }
}
</script>

<template>
  <var-card>
    <var-button block>userActivation:{{ userActivation() }}</var-button>
    <var-button block type="primary" @click="wakeLock">wakeLock</var-button>
    <var-button block type="info" @click="canShare">canShare</var-button>
    <var-button block type="success" @click="getGamepads">getGamepads</var-button>
    <var-button block type="primary" @click="requestMIDIAccess">requestMIDIAccess</var-button>
    <var-button block type="danger" @click="requestMediaKeySystemAccess">requestMediaKeySystemAccess</var-button>
    <var-button block type="warning" @click="sendBeacon">sendBeacon</var-button>
    <var-button block type="info" @click="share">share</var-button>
  </var-card>
</template>