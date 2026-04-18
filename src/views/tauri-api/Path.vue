<script setup>
import {
  appConfigDir, appDataDir, appLocalDataDir, appCacheDir, appLogDir, audioDir,
  cacheDir, configDir, dataDir, desktopDir, documentDir, downloadDir, executableDir,
  fontDir, homeDir, localDataDir, pictureDir, publicDir, resourceDir, resolveResource,
  runtimeDir, templateDir, videoDir, sep, delimiter, resolve, normalize, join, dirname,
  extname, basename, isAbsolute, tempDir,
} from '@tauri-apps/api/path';
import {onMounted, ref} from 'vue';

const path = ref({
  appConfigDir, appDataDir, appLocalDataDir, appCacheDir, appLogDir, audioDir,
  cacheDir, configDir, dataDir, desktopDir, documentDir, downloadDir, executableDir,
  fontDir, homeDir, localDataDir, pictureDir, publicDir, resourceDir, resolveResource,
  runtimeDir, templateDir, videoDir, tempDir,
});
onMounted(() => {
  for (let key of Object.keys(path.value)) {
    // 执行完就覆盖方法为结果值
    path.value[key]().then(v => path.value[key] = v).catch(e => path.value[key] = e);
  }
  // 直接取值对象
  path.value.sep = sep();
  path.value.delimiter = delimiter();
  // 需要传递参数的
  resolve('./', 'users', 'tauri', 'avatar.png').then(v => path.value.resolve = v).catch(e => path.value.resolve = e);
  normalize('./../users/tauri/avatar.png').then(v => path.value.normalize = v).catch(e => path.value.normalize = e);
  join('./', 'users', 'tauri', 'avatar.png').then(v => path.value.join = v).catch(e => path.value.join = e);
  dirname("../users/tauri/avatar.png").then(v => path.value.dirname = v).catch(e => path.value.dirname = e);
  extname('tauri-plugins-code.log').then(v => path.value.extname = v).catch(e => path.value.extname = e);
  basename('tauri-plugins-code.log').then(v => path.value.basename = v).catch(e => path.value.basename = e);
  isAbsolute('./').then(v => path.value.isAbsolute = v).catch(e => path.value.isAbsolute = e);
})

</script>
<template>
  <var-card>
    <var-cell style="overflow-wrap: break-word" v-for="item in Object.keys(path)" :key="item"
              :title="item" :description="path[item] + ''" variant="filled"/>
  </var-card>
</template>