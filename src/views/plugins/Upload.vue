<route>
{meta: {
description: "Upload files from disk to a remote server over HTTP. Download files from a remote HTTP server to disk.",
}}
</route>
<script setup>
import {upload, download} from '@tauri-apps/plugin-upload';
import {appLogDir, downloadDir} from '@tauri-apps/api/path';
import {Snackbar} from '@varlet/ui';
import {ref} from "vue";

const upload_file = ref("");

async function uploadLog() {
  upload_file.value = await appLogDir() + "/tauri-plugins-code.log";
  upload(
      'https://example.com/file-upload',
      upload_file.value,
      ({progress, total}) => {
        Snackbar.info(`Uploaded ${progress} of ${total} bytes`); // a callback that will be called with the upload progress
        console.log(`Uploaded ${progress} of ${total} bytes`); // a callback that will be called with the upload progress
      },
      {'Content-Type': 'text/plain'} // optional headers to send with the request
  ).catch(err => {
    Snackbar.error(err);
  });
}

const download_file = ref("");

async function downloadFile() {
  download_file.value = await downloadDir() + '/logo.png';
  download(
      'https://tauri.app/logo.png',
      download_file.value,
      ({progress, total}) => {
        Snackbar.info(`Downloaded ${progress} of ${total} bytes`); // a callback that will be called with the download progress
        console.log(`Downloaded ${progress} of ${total} bytes`); // a callback that will be called with the download progress
      },
      {'Content-Type': 'text/plain'} // optional headers to send with the request
  ).catch(err => {
    Snackbar.error(err);
  });
}
</script>
<template>
  <var-card>
    <var-button type="primary" block @click="uploadLog">upload log {{ upload_file }}</var-button>
    <var-button type="success" block @click="downloadFile">download logo.png {{ download_file }}</var-button>
  </var-card>
</template>