<route>
{meta: {
description: "Cross-platform filesystem manager for Tauri with Android SAF and iOS document picker support.",
}}
</route>
<script setup>
import {
  isDesktop,
  getPlatformFsCapabilities,
  createNewDir as _createNewDir,
  createNewFile as _createNewFile,
  readDir,
  readTextFile,
  showOpenDirPicker,
  showOpenFilePicker,
  showSaveFilePicker as _showSaveFilePicker,
  writeTextFile,
  exists,
  getMetadata,
  removeDirAll,
  renameFile,
  renameDir,
  removeEmptyDir,
  writeFile,
  readFile,
} from '@vnidrop/tauri-plugin-fs';
import {
  AndroidPublicGeneralPurposeDir,
  createNewPublicFile,
  scanPublicFile,
} from '@vnidrop/tauri-plugin-fs/android';
import {
  listSecurityScopedBookmarks,
  resolveSecurityScopedBookmark,
} from '@vnidrop/tauri-plugin-fs/ios';

import {Snackbar} from "@varlet/ui";

async function readFile_() {
  try {
    let paths = await showOpenFilePicker();
    if (paths.length === 0) return
    // let data = await readFile(paths[0]);
    let data = await readTextFile(paths[0]);
    Snackbar.success(data);
  } catch (e) {
    Snackbar.error(e);
  }
}

async function showSaveFilePicker(filename) {
  let file = null;
  // #if VITE_desktop
  file = await _showSaveFilePicker({defaultPath: filename});
  // #elif VITE_mobile
  file = await _showSaveFilePicker(filename);
  // #endif
  return file;
}

async function writeFile_() {
  try {
    let filename = await showSaveFilePicker('test.txt');
    if (filename === null) return;
    // await writeFile(filename, crypto.getRandomValues(new Uint8Array(32)))
    // await writeFile(filename, new TextEncoder().encode(crypto.randomUUID()))
    await writeTextFile(filename, crypto.randomUUID())
    Snackbar.success(JSON.stringify(filename));
  } catch (e) {
    Snackbar.error(e);
  }
}

async function readDir_() {
  try {
    let dir = await showOpenDirPicker();
    if (dir === null) return;
    let dirs = await readDir(dir);
    Snackbar.success(JSON.stringify(dirs));
  } catch (e) {
    Snackbar.error(e);
  }
}

async function createNewFile(dir, filename) {
  let fsPath = null;
  // #if VITE_desktop
  fsPath = await _createNewFile(`${dir}/${filename}`);
  // #elif VITE_mobile
  fsPath = await _createNewFile(dir, filename);
  // #endif
  return fsPath;
}

async function createNewFile_() {
  try {
    let dir = await showOpenDirPicker();
    if (dir === null) return;
    let paths = await Promise.all([0, 1, 2].map(m => createNewFile(dir, `notes-${m}.txt`)));
    Snackbar.success(JSON.stringify(paths));
  } catch (e) {
    Snackbar.error(e);
  }
}

async function createNewDir(dir, _dir) {
  let fsPath = null;
  // #if VITE_desktop
  fsPath = await _createNewDir(`${dir}/${_dir}`);
  // #elif VITE_mobile
  fsPath = await _createNewDir(dir, _dir);
  // #endif
  return fsPath;
}

async function createNewDir_() {
  try {
    let dir = await showOpenDirPicker();
    if (dir === null) return;
    let paths = await Promise.all([0, 1, 2].map(m => createNewDir(dir, `notes${m}`)));
    Snackbar.success(JSON.stringify(paths));
  } catch (e) {
    Snackbar.error(e);
  }
}

// #if VITE_mobile_android
async function createNewPublicFile_() {
  try {
    let file = await createNewPublicFile(AndroidPublicGeneralPurposeDir.Documents, 'Reports/report.txt', 'text/plain',);
    await writeTextFile(file, crypto.randomUUID());
    await scanPublicFile(file);
    Snackbar.success("createNewPublicFile writeTextFile scanPublicFile");
  } catch (e) {
    Snackbar.error(e);
  }
}

// #elif VITE_mobile_ios
async function resolveSecurityScopedBookmark_() {
  try {
    let fsUris = await listSecurityScopedBookmarks();
    if (fsUris.length === 0) return;
    let data = await Promise.all(fsUris.map(m => resolveSecurityScopedBookmark(m.bookmarkId)));
    Snackbar.success(JSON.stringify(data));
  } catch (e) {
    Snackbar.error(e);
  }
}

// #endif
</script>

<template>
  <var-card title="vnidrop-fs">
    <var-button block type="info">isDesktop: {{ isDesktop() }}</var-button>
    <var-card title="PlatformFsCapabilities">{{ getPlatformFsCapabilities() }}</var-card>
    <var-button block type="success" @click="readFile_">readFile</var-button>
    <var-button block type="warning" @click="writeFile_">writeFile</var-button>
    <var-button block type="danger" @click="readDir_">readDir</var-button>
    <var-button block type="primary" @click="createNewFile_">createNewFile(3)</var-button>
    <var-button block type="info" @click="createNewDir_">createNewDir(3)</var-button>
    // #if VITE_mobile_android
    <var-button block @click="createNewPublicFile_">createNewPublicFile_</var-button>
    // #elif VITE_mobile_ios
    <var-button block @click="resolveSecurityScopedBookmark_">resolveSecurityScopedBookmark</var-button>
    // #endif
  </var-card>
</template>