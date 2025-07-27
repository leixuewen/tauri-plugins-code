<script setup>
import {
    appConfigDir, appDataDir, appLocalDataDir, appCacheDir, appLogDir, audioDir, cacheDir,
    configDir, dataDir, desktopDir, documentDir, downloadDir, executableDir, fontDir, homeDir,
    localDataDir, pictureDir, publicDir, resourceDir, resolveResource, runtimeDir, templateDir,
    videoDir, sep, delimiter, resolve, normalize, join, dirname, extname, basename, isAbsolute, tempDir,
} from '@tauri-apps/api/path';
import { onMounted, ref } from 'vue';
import { type } from '@tauri-apps/plugin-os';
import { Snackbar } from '@varlet/ui';

const osType = type();
const dir = ref({
    appConfigDir: "",
    appDataDir: "",
    appLocalDataDir: "",
    appCacheDir: "",
    appLogDir: "",
    audioDir: "",
    cacheDir: "",
    configDir: "",
    dataDir: "",
    desktopDir: "",
    documentDir: "",
    downloadDir: "",
    executableDir: "",
    fontDir: "",
    homeDir: "",
    localDataDir: "",
    pictureDir: "",
    publicDir: "",
    resourceDir: "",
    resolveResource: "",
    runtimeDir: "",
    templateDir: "",
    videoDir: "",
    sep: "",
    delimiter: "",
    resolve: "",
    tempDir: "",
    normalize: "",
    join: "",
    dirname: "",
    extname: "",
    basename: "",
    isAbsolute: "",
});

onMounted(async () => {
    try {
        dir.value.appConfigDir = await appConfigDir();
        dir.value.appDataDir = await appDataDir();
        dir.value.appLocalDataDir = await appLocalDataDir();
        dir.value.appCacheDir = await appCacheDir();
        dir.value.appLogDir = await appLogDir();
        dir.value.audioDir = await audioDir();
        dir.value.cacheDir = await cacheDir();
        dir.value.configDir = await configDir();
        dir.value.dataDir = await dataDir();
        dir.value.desktopDir = !['android'].includes(osType) ? await desktopDir() : "";
        dir.value.documentDir = await documentDir();
        dir.value.downloadDir = await downloadDir();
        dir.value.executableDir = ['linux'].includes(osType) ? await executableDir() : "";
        dir.value.fontDir = !['windows', 'android'].includes(osType) ? await fontDir() : "";
        dir.value.homeDir = await homeDir();
        dir.value.localDataDir = await localDataDir();
        dir.value.pictureDir = await pictureDir();
        dir.value.publicDir = await publicDir();
        dir.value.resourceDir = await resourceDir();
        dir.value.resolveResource = await resolveResource();
        dir.value.runtimeDir = ['linux'].includes(osType) ? await runtimeDir() : "";
        dir.value.templateDir = !['macos', 'android'].includes(osType) ? await templateDir() : "";
        dir.value.videoDir = await videoDir();
        dir.value.sep = await sep();
        dir.value.delimiter = await delimiter();
        dir.value.resolve = await resolve();
        dir.value.tempDir = await tempDir();

        dir.value.normalize = await normalize(`${dir.value.appDataDir}/../users/tauri/avatar.png`);
        dir.value.join = await join(dir.value.appDataDir, 'users', 'tauri', 'avatar.png');
        dir.value.dirname = await dirname(dir.value.appDataDir);
        dir.value.extname = await extname(dir.value.appLogDir + dir.value.sep + 'tauri-plugins-code.log');
        dir.value.basename = await basename(dir.value.appLogDir + dir.value.sep + 'tauri-plugins-code.log');
        dir.value.isAbsolute = await isAbsolute(dir.value.appLogDir) + '';
    } catch (err) {
        Snackbar.error(err);
    }
});

</script>
<template>
    <var-card>
        <var-cell style="overflow-wrap: break-word" v-for="item in Object.keys(dir)" :key="item" :title="item"
            :description="dir[item] || 'Not supported'" variant="filled" />
    </var-card>
</template>