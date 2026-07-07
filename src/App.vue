<script setup>
import AppBar from './components/AppBar.vue';
import "@varlet/ui/es/snackbar/style";
import {statusbar} from './const.js';
</script>
<template>
  <var-paper radius="0" id="var-paper" :style="{paddingTop: `calc(54px + ${statusbar})`}">
    <AppBar :style="{paddingTop: statusbar}"/>
    <RouterView/>
  </var-paper>
</template>
<style>
#var-paper {
  height: 100vh;
  overflow: auto;
}

.var-snackbar__content {
  word-break: break-word;
}

/* 隐藏滚动条 */
*::-webkit-scrollbar {
  display: none;
}
</style>