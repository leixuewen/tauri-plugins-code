<route>
{meta: {
description: "Get screenshots of windows and monitors.",
}}
</route>
<script setup>
import {
  getScreenshotableWindows,
  getScreenshotableMonitors,
  getWindowScreenshot,
  getMonitorScreenshot,
  removeWindowScreenshot,
  removeMonitorScreenshot,
  clearScreenshots,
} from "tauri-plugin-screenshots-api";
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from '@varlet/ui';

onMounted(() => {
  loadScreenshotWindows();
  loadScreenshotMonitors();
});
onUnmounted(() => {
  clearScreenshots();
});

/**
 * @type {import('vue').Ref<ScreenshotableWindow[]>}
 */
const screenshotWindows = ref([]);

function loadScreenshotWindows() {
  getScreenshotableWindows().then(val => {
    console.log(val);
    screenshotWindows.value = val;
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

/**
 * @type {import('vue').Ref<ScreenshotableMonitor[]>}
 */
const screenshotMonitors = ref([]);

function loadScreenshotMonitors() {
  getScreenshotableMonitors().then(val => {
    console.log(val);
    screenshotMonitors.value = val;
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

function getWindowScreenshots(id) {
  getWindowScreenshot(id).then(val => {
    console.log(val);
    Snackbar.success('getWindowScreenshot success => ' + val);
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

function getMonitorScreenshots(id) {
  getMonitorScreenshot(id).then(val => {
    console.log(val);
    Snackbar.success('getMonitorScreenshot success => ' + val);
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

function removeWindowScreenshots(id) {
  removeWindowScreenshot(id).then(val => {
    console.log(val);
    Snackbar.info('removeWindowScreenshot success');
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

function removeMonitorScreenshots(id) {
  removeMonitorScreenshot(id).then(val => {
    console.log(val);
    Snackbar.info('removeMonitorScreenshot success');
  }).catch(err => {
    Snackbar.error('Screenshots Error : ' + err);
  });
}

</script>
<template>
  <var-card title="GetScreenshot">
    <var-cell v-for="item in screenshotWindows" :key="item.id" :title="item.appName"
              :description="JSON.stringify(item)" border>
      <template #extra>
        <div style="text-align: center">
          <var-button round icon-container @click="getWindowScreenshots(item.id)">
            <var-icon name="camera"/>
          </var-button>
          <var-button round icon-container @click="removeWindowScreenshots(item.id)">
            <var-icon name="delete"/>
          </var-button>
        </div>
      </template>
    </var-cell>
    <var-button type="success" block @click="loadScreenshotWindows">loadScreenshotWindows</var-button>
    <var-cell v-for="item in screenshotMonitors" :key="item.id" :title="item.name"
              :description="JSON.stringify(item)" border>
      <template #extra>
        <div style="text-align: center">
          <var-button round icon-container @click="getMonitorScreenshots(item.id)">
            <var-icon name="camera"/>
          </var-button>
          <var-button round icon-container @click="removeMonitorScreenshots(item.id)">
            <var-icon name="delete"/>
          </var-button>
        </div>
      </template>
    </var-cell>
    <var-button type="primary" block @click="loadScreenshotMonitors">loadScreenshotMonitors</var-button>
  </var-card>
  <var-button type="danger" block @click="clearScreenshots">clearScreenshots all</var-button>
</template>