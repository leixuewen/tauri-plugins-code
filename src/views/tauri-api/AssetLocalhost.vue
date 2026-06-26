<script setup>
import {ref} from "vue";
import {Snackbar} from '@varlet/ui';
import {mkdir, remove} from "@tauri-apps/plugin-fs";
import {appCacheDir, join} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api/core";

const loading = ref(false);

let targetPath;
appCacheDir().then(val => join(val, "dist")).then(val => {
  targetPath = val;
  mkdir(val);
})

function importHtml() {
  loading.value = true;
  let el = document.createElement("input");
  el.type = "file";
  el.hidden = true;
  el.accept = ".zip";
  el.onchange = async e => {
    let data = await e.target.files[0].arrayBuffer();
    await invoke("asset_localhost", {data, targetPath});
    document.body.removeChild(el);
    loading.value = false;
  }
  el.oncancel = () => {
    document.body.removeChild(el);
    loading.value = false;
  }
  document.body.appendChild(el);
  el.click();
}

function accessHtml() {
  join(targetPath, "index.html").then(html => {
    // #if VITE_desktop_windows || VITE_mobile_android
    window.location.href = `http://asset.localhost/${html}`;
    // #else
    window.location.href = `asset://localhost/${html}`;
    // #endif
  }).catch(err => Snackbar.error(err))
}

function delectHtml() {
  remove(targetPath, {recursive: true});
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