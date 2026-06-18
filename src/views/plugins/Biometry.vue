<route>
{meta: {
description: "A Tauri v2 plugin for biometric authentication (Touch ID, Face ID, fingerprint) on Android, macOS, iOS and Windows.",
}}
</route>
<script setup>
import {
  BiometryType,
  checkStatus,
  authenticate,
  hasData,
  getData,
  setData,
  removeData,
} from '@choochmeque/tauri-plugin-biometry-api';
import {onBeforeMount} from "vue";
import {Snackbar} from "@varlet/ui";

onBeforeMount(() => {
  _checkStatus()
})

function _checkStatus() {
  checkStatus().then(val => {
    val.isAvailable ? Snackbar.success(JSON.stringify(val)) : Snackbar.warning(JSON.stringify(val));
  }).catch(err => Snackbar.error(err))
}

function _authenticate() {
  authenticate('Please authenticate to continue', {
    allowDeviceCredential: true,
    cancelTitle: 'Cancel',
    fallbackTitle: 'Use Passcode',
    title: 'Authentication Required',
    subtitle: 'Access your secure data',
    confirmationRequired: false
  }).then(() => {
    Snackbar.success("Authentication successful")
  }).catch(err => Snackbar.error(err))
}

function _setData() {
  setData({
    domain: 'com.myapp',
    name: 'api_key',
    data: 'secret-api-key-123',
  }).then(() => {
    Snackbar.success("API token is stored")
  }).catch(err => Snackbar.error(err));
}

function _getData() {
  getData({
    domain: 'com.myapp',
    name: 'api_key',
    reason: 'Access your API key',
    // cancelTitle: 'Cancel',
  }).then(val => {
    Snackbar.info(JSON.stringify(val))
  }).catch(err => Snackbar.error(err));
}

function _hasData() {
  hasData({
    domain: 'com.myapp',
    name: 'api_key',
  }).then(val => {
    val ? Snackbar.success("API token exist") : Snackbar.warning("API token not exist")
  }).catch(err => Snackbar.error(err))
}

function _removeData() {
  removeData({
    domain: 'com.myapp',
    name: 'api_token'
  }).then(() => {
    Snackbar.success("Token removed from secure storage")
  }).catch(err => Snackbar.error(err));
}
</script>

<template>
  <var-card title="Biometry">
    <var-card title="Type">
      <var-chip v-for="item in 5">{{ BiometryType[item - 1] }} = {{ item - 1 }}</var-chip>
    </var-card>
    <var-button type="info" block @click="_checkStatus">checkStatus</var-button>
    <var-button type="primary" block @click="_authenticate">authenticate</var-button>
    <var-card title="Secure Storage Data">
      <var-button block type="primary" @click="_setData">setData</var-button>
      <var-button block type="info" @click="_getData">getData</var-button>
      <var-button block type="success" @click="_hasData">hasData</var-button>
      <var-button block type="danger" @click="_removeData">removeData</var-button>
    </var-card>
  </var-card>
</template>