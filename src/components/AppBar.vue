<script setup>
import { StyleProvider, Themes } from '@varlet/ui';

const THEMES = [
  {s: null, t: "Md2 亮色"},
  {s: Themes.dark, t: "Md2 暗色"},
  {s: Themes.md3Light, t: "Md3 亮色"},
  {s: Themes.md3Dark, t: "Md3 暗色"},
]
</script>
<template>
    <var-app-bar fixed :title="$route.path.split('/').pop()" title-position="center">
        <template #left>
            <var-button v-if="$route.fullPath !== '/'" @click="$router.back()" text-color="#fff" round text>
                <var-icon size="32" name="chevron-left" />
            </var-button>
            <var-link v-else href="https://github.com/leixuewen/tauri-plugins-code" target="_blank" underline="none">
                <var-button text-color="#fff" round text>
                    <var-icon size="32" name="github" />
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
                    <var-cell ripple v-for="item in THEMES" @click="StyleProvider(item.s)">{{ item.t }}</var-cell>
                </template>
            </var-menu>
        </template>
    </var-app-bar>
</template>