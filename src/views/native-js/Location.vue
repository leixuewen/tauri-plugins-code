<script setup>
let location = {}
Object.keys(window.location).forEach(v => {
  if (typeof window.location[v] === 'string') {
    location[v] = window.location[v];
  }
})
</script>

<template>
  <var-card title="Location">
    <var-cell v-for="item in Object.keys(location)" :title="item" :description="location[item]"/>
  </var-card>
</template>