<script setup>
import plugins from '@/router/plugins';
import tauriApi from '@/router/tauri-api';
import nativeJS from '@/router/native-js';
import { ref } from 'vue';

const active = ref(0);
const tabs = ref([
  { val: plugins, label: "plugins", icon: "home" },
  { val: tauriApi, label: "tauriApi", icon: "magnify" },
  { val: nativeJS, label: "nativeJS", icon: "code-json" },
]);

</script>

<template>
  <var-tabs-items v-model:active="active">
    <var-tab-item class="app" v-for="tab of tabs">
      <var-cell v-for="item of tab.val" @click="$router.push(item.path)" :title="item.name"
        :description="item.meta.description" :border="true">
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </var-tab-item>
  </var-tabs-items>
  <var-bottom-navigation v-model:active="active">
    <var-bottom-navigation-item v-for="tab of tabs" :label="tab.label" :icon="tab.icon" />
  </var-bottom-navigation>
</template>
<style scoped>
.app {
  height: calc(100vh - 104px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
