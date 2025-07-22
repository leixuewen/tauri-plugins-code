<script setup>
import plugins from '@/router/plugins'
</script>

<template>
  <var-cell v-for="item of plugins" @click="$router.push(item.path)" :title="item.name"
    :description="item.meta.description" :border="true">
    <template #extra>
      <var-icon name="chevron-right" />
    </template>
  </var-cell>
</template>
