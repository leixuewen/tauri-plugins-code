<script setup>
import AppBar from './components/AppBar.vue';
import "@varlet/ui/es/snackbar/style";

const top =
// #if VITE_mobile
    `36px`
// #else
    `0px`
// #endif
</script>
<template>
  <var-paper radius="0" id="var-paper" :style="{paddingTop: `calc(54px + ${top})`}">
    <AppBar :style="{paddingTop: top}"/>
    <RouterView/>
  </var-paper>
</template>
<style>
#var-paper {
  height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.var-snackbar__content {
  word-break: break-word;
}
</style>