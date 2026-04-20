<script setup>
import { StyleProvider, Themes } from '@varlet/ui';
import { Locale } from '@varlet/ui';
</script>
<template>
    <var-app-bar :title="$route.path.split('/').pop()" title-position="center">
        <template #left>
            <var-button v-if="$route.fullPath != '/'" @click="$router.back()" text-color="#fff" round text>
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
</template>