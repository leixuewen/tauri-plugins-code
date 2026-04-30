<script setup>
import {ref} from "vue";
import {Snackbar} from '@varlet/ui';
import {mkdir, remove, writeFile} from "@tauri-apps/plugin-fs";
import {appCacheDir, BaseDirectory, join} from "@tauri-apps/api/path";

const loading = ref(false);
const baseDir = BaseDirectory.AppCache;

mkdir("dist/assets", {baseDir, recursive: true});
mkdir("dist/face-api/models", {baseDir, recursive: true});

function importHtml() {
  loading.value = true;
  let el = document.createElement("input");
  el.type = "file";
  el.hidden = true;
  el.webkitdirectory = true;
  el.onchange = e => {
    for (let file of e.target.files) {
      writeFile(file.webkitRelativePath, file.stream(), {baseDir})
      // console.log(file);
    }
    document.body.removeChild(el);
    loading.value = false;
  }
  el.oncancel = e => {
    document.body.removeChild(el);
    loading.value = false;
  }
  document.body.appendChild(el);
  el.click();
}

function accessHtml() {
  appCacheDir().then(val => {
    return join(val, 'dist', "index.html");
  }).then(html => {
    window.location.href = `http://asset.localhost/${html}`;
  }).catch(err => Snackbar.error(err))
}

function delectHtml() {
  remove('dist', {baseDir, recursive: true});
  window.location.reload();
}
</script>

<template>
  <var-card>
    <var-button block :loading="loading" @click="importHtml">导入html('dist')</var-button>
    <var-button block type="info" @click="accessHtml">访问html('dist')</var-button>
    <var-button block type="danger" @click="delectHtml">删除html('dist')</var-button>
  </var-card>
</template>