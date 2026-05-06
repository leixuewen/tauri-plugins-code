<script setup>
import {onBeforeMount, ref} from "vue";

// 权限数组
const permissions = [
  "accelerometer",
  "accessibility-events",
  "ambient-light-sensor",
  "background-sync",
  "camera",
  "clipboard-read",
  "clipboard-write",
  "geolocation",
  "gyroscope",
  "local-fonts",
  "magnetometer",
  "microphone",
  "midi",
  "notifications",
  "payment-handler",
  "persistent-storage",
  "push",
  "screen-wake-lock",
  "storage-access",
  "top-level-storage-access",
  "window-management",
];

// 在 try...catch 块中查询单个权限并返回结果
async function getPermission(permission) {
  try {
    let result;
    if (permission === "top-level-storage-access") {
      result = await navigator.permissions.query({
        name: permission,
        requestedOrigin: window.location.origin,
      });
    } else {
      result = await navigator.permissions.query({name: permission});
    }
    return `${permission}：${result.state}`;
  } catch (error) {
    return `${permission}（不支持）`;
  }
}

let results = ref([]);
onBeforeMount(async () => {
  for (const permission of permissions) {
    results.value.push(await getPermission(permission));
  }
})
</script>

<template>
  <var-card title="navigator.permissions.query()">
    <var-cell v-for="item in results">{{ item }}</var-cell>
  </var-card>
</template>