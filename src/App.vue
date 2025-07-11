<script setup>
import AppBar from '@/components/AppBar.vue';
</script>
<template>
  <AppBar />
  <var-paper radius="0" id="var-paper">
    <RouterView />
  </var-paper>
</template>
<style>
#var-paper {
  height: calc(100vh - 70px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>