<script setup>
import Recipes from '@/router/Recipes'
</script>

<template>
  <var-cell v-for="item of Recipes" @click="$router.push(item.path)" :title="item.name"
    :description="item.meta.description" :border="true">
    <template #extra>
      <var-icon name="chevron-right" />
    </template>
  </var-cell>
</template>
