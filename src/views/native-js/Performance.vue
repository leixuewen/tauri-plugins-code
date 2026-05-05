<script setup>
import {ref} from "vue";

const performance = ref({
  now: window.performance.now(),
  navigation: window.performance.navigation,
  timeOrigin: window.performance.timeOrigin,
  timing: window.performance.timing,
  getEntries: window.performance.getEntries(),
})

</script>

<template>
  <var-card title="Performance">
    <var-card :title="item" v-for="item in Object.keys(performance)">{{ performance[item] }}</var-card>
  </var-card>
</template>