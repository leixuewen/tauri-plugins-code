<script setup>
import AppBar from '@/components/AppBar.vue';
import "@varlet/ui/es/snackbar/style";
</script>
<template>
  <AppBar />
  <var-paper radius="0" id="var-paper">
    <RouterView />
  </var-paper>
</template>
<style>
#var-paper {
  height: calc(100vh - 54px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.var-snackbar__content {
  word-break: break-word;
}
</style>