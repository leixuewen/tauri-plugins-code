<script setup>
import {
  defaultWindowIcon,
  fetchDataStoreIdentifiers,
  getBundleType,
  getIdentifier,
  getName,
  getTauriVersion,
  getVersion,
  hide,
  show,
  setTheme,
  setDockVisibility,
  removeDataStore,
  onBackButtonPress,
} from '@tauri-apps/api/app';
import {type, arch} from '@tauri-apps/plugin-os';
import {openUrl} from '@tauri-apps/plugin-opener';
import {StyleProvider, Themes} from '@varlet/ui';
import {onBeforeMount, ref} from 'vue';
import {Snackbar, Dialog} from '@varlet/ui';
import "@varlet/ui/es/dialog/style";

const theme = ref('light');
const app = ref({
  defaultWindowIcon: {},
  fetchDataStoreIdentifiers: [],
  getBundleType: {},
  getIdentifier: "",
  getName: "",
  getTauriVersion: "",
  getVersion: "",
});

onBeforeMount(() => {
  defaultWindowIcon().then(val => {
    app.value.defaultWindowIcon.rid = val.rid;
    // val.rgba().then(r => app.value.defaultWindowIcon.rgba = r);
    val.size().then(s => app.value.defaultWindowIcon.size = s);
  });
  fetchDataStoreIdentifiers().then(val => app.value.fetchDataStoreIdentifiers = val);
  getBundleType().then(val => app.value.getBundleType = val);
  getIdentifier().then(val => app.value.getIdentifier = val);
  getName().then(val => app.value.getName = val);
  getTauriVersion().then(val => app.value.getTauriVersion = val);
  getVersion().then(val => app.value.getVersion = val);
});

function hideFun() {
  hide();
  setTimeout(() => {
    show();
  }, 3000);
}

function setThemeFun() {
  if (theme.value == 'light') {
    setTheme('dark');
    StyleProvider(Themes.md3Dark);
    theme.value = 'dark';
  } else {
    setTheme('light');
    StyleProvider(Themes.md3Light);
    theme.value = 'light';
  }
}

function removeDataStoreFun() {
  app.value.fetchDataStoreIdentifiers.forEach(v => {
    removeDataStore(v).then(res => {
      Snackbar.success('Clear Successfully !');
    }).catch(err => {
      Snackbar.error('Clear Error !' + err);
    });
  })
}

const backButtonPress = ref({});

function onBackButtonPressFun() {
  if (backButtonPress.value.channelId) {
    backButtonPress.value.unregister();
    backButtonPress.value = {};
    return;
  }
  onBackButtonPress().then(val => backButtonPress.value = val);
}

const updaterVal = ref("http://localhost:1420/latest.json");

function checkUpdate() {
  // 获取更新文件.json
  fetch(updaterVal.value).then(res => {
    return res.json();
  }).then(val => {
    console.log(val);
    // 比对版本信息
    if (val.version !== app.value.getVersion) {
      Dialog({
        title: "New version available",
        message: val.notes,
        onConfirm: () => {
          openUrl(val.platforms[`${type()}-${arch()}`].url);
        }
      })
    } else {
      Dialog("Already the latest version")
    }
  })
}
</script>
<template>
  <var-card>
    <var-cell>defaultWindowIcon : {{ app.defaultWindowIcon }}</var-cell>
    <var-cell>fetchDataStoreIdentifiers : {{ app.fetchDataStoreIdentifiers }}</var-cell>
    <var-cell>getBundleType : {{ app.getBundleType }}</var-cell>
    <var-cell>getIdentifier : {{ app.getIdentifier }}</var-cell>
    <var-cell>getName : {{ app.getName }}</var-cell>
    <var-cell>getTauriVersion : {{ app.getTauriVersion }}</var-cell>
    <var-cell>getVersion : {{ app.getVersion }}</var-cell>
    // #if VITE_mobile_android
    <var-cell>
      <var-button type="success" @click="onBackButtonPressFun">onBackButtonPress</var-button>
      {{ backButtonPress }}
    </var-cell>
    // #endif
    // #if VITE_desktop_macos
    <var-button block type="primary" @click="hideFun"> app hide => app show</var-button>
    <var-button block type="primary" @click="setDockVisibility(true)">setDockVisibility</var-button>
    // #endif
    <var-button block type="danger" @click="removeDataStoreFun">removeDataStore</var-button>
    <var-button block type="primary" @click="setThemeFun">setTheme {{ theme }}</var-button>
  </var-card>
  <var-card title="Custom Updater">
    <var-input v-model="updaterVal"/>
    <var-button block type="success" @click="checkUpdate">check update</var-button>
  </var-card>
</template>