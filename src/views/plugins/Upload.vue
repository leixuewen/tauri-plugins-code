<script setup>
import { upload, download } from '@tauri-apps/plugin-upload';
import { appLogDir, downloadDir } from '@tauri-apps/api/path';
import { Snackbar } from '@varlet/ui';

async function uploadLog() {
    let path = await appLogDir();
    upload(
        'https://example.com/file-upload',
        path + "/tauri-plugins-code.log",
        ({ progress, total }) => {
            Snackbar.info(`Uploaded ${progress} of ${total} bytes`); // a callback that will be called with the upload progress
            console.log(`Uploaded ${progress} of ${total} bytes`); // a callback that will be called with the upload progress
        },
        { 'Content-Type': 'text/plain' } // optional headers to send with the request
    ).catch(err => {
        Snackbar.error(err);
    });
}

async function downloadFile() {
    let path = await downloadDir();
    download(
        'https://tauri.app/_astro/logo_light.Br3nqH4L.svg',
        path + '/tauri.svg',
        ({ progress, total }) => {
            Snackbar.info(`Downloaded ${progress} of ${total} bytes`); // a callback that will be called with the download progress
            console.log(`Downloaded ${progress} of ${total} bytes`); // a callback that will be called with the download progress
        },
        { 'Content-Type': 'text/plain' } // optional headers to send with the request
    ).catch(err => {
        Snackbar.error(err);
    });
}
</script>
<template>
    <var-card>
        <var-button type="primary" block @click="uploadLog">upload log</var-button>
        <var-button type="success" block @click="downloadFile">download tauri.svg</var-button>
    </var-card>
</template>