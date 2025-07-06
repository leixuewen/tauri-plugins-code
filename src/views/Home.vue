<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
import { Locale } from '@varlet/ui'
import Recipes from '@/router/Recipes'
</script>

<template>
  <var-app-bar>
    <template #left>
      <var-link href="https://github.com/leixuewen/tauri-plugins-code" target="_blank" underline="none">
        <var-button text-color="#fff" round text>
          <var-icon name="github" />
        </var-button>
      </var-link>
    </template>
    <template #right>
      <var-menu>
        <var-button text-color="#fff" text>
          <var-icon name="palette-outline" />
          <var-icon name="chevron-down" />
        </var-button>
        <template #menu>
          <var-cell ripple @click="StyleProvider()">Md2 亮色</var-cell>
          <var-cell ripple @click="StyleProvider(Themes.dark)">Md2 暗色</var-cell>
          <var-cell ripple @click="StyleProvider(Themes.md3Light)">Md3 亮色</var-cell>
          <var-cell ripple @click="StyleProvider(Themes.md3Dark)">Md3 暗色</var-cell>
        </template>
      </var-menu>
      <var-menu>
        <var-button text-color="#fff" text>
          <var-icon name="translate" />
          <var-icon name="chevron-down" />
        </var-button>
        <template #menu>
          <var-cell @click="Locale.use('zh-CN')" ripple>中文</var-cell>
          <var-cell @click="Locale.use('en-US')" ripple>Engine</var-cell>
        </template>
      </var-menu>
    </template>
  </var-app-bar>
  <var-cell v-for="item of Recipes" @click="$router.push(item.path)" :title="item.name"
    :description="item.meta.description" :border="true">
    <template #extra>
      <var-icon name="chevron-right" />
    </template>
  </var-cell>
</template>
