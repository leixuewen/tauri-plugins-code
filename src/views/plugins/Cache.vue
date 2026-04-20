<route>
{meta: {
description: "Advanced disk caching solution for Tauri applications. Provides compression, TTL management, memory caching, automatic cleanup, and cross-platform support. Enhances data access performance and storage optimization.",
}}
</route>
<script setup>
import {set, get, has, remove, clear, stats} from 'tauri-plugin-cache-api';
import {ref} from "vue";

/**
 * @type {import('vue').Ref<{}>}
 */
const get_cache = ref({});

function getCache(key) {
  get(key).then(val => get_cache.value[key] = val);
}

/**
 * @type {import('vue').Ref<{}>}
 */
const has_cache = ref({});

function hasCache(key) {
  has(key).then(val => has_cache.value[key] = val);
}

const stats_cache = ref();

function statsCache() {
  stats().then(val => stats_cache.value = val);
}
</script>

<template>
  <var-card title="tauri-plugin-cache">
    <var-button block type="primary" @click="set('key', Math.random())">set('key', Math.random())</var-button>
    <var-button block type="primary" @click="set('key_ttl', Math.random(), {ttl: 10})">set('key_ttl', Math.random(),
      {ttl: 10})
    </var-button>
    <var-button block type="primary" @click="set('key_ttl_compress', Math.random(), {ttl: 30,compress: true})">
      set('key_ttl_compress', Math.random(), {ttl: 30,compress: true})
    </var-button>
    <var-button block @click="getCache('key')">get('key') {{ get_cache['key'] }}</var-button>
    <var-button block @click="getCache('key_ttl')">get('key_ttl') {{ get_cache['key_ttl'] }}</var-button>
    <var-button block @click="getCache('key_ttl_compress')">get('key_ttl_compress') {{ get_cache['key_ttl_compress'] }}
    </var-button>
    <var-button block type="success" @click="hasCache('key')">has('key') {{ has_cache['key'] }}</var-button>
    <var-button block type="success" @click="hasCache('key_ttl')">has('key_ttl') {{ has_cache['key_ttl'] }}</var-button>
    <var-button block type="success" @click="hasCache('key_ttl_compress')">has('key_ttl_compress')
      {{ has_cache['key_ttl_compress'] }}
    </var-button>
    <var-button block type="warning" @click="remove('key')">remove('key')</var-button>
    <var-button block type="warning" @click="remove('key_ttl')">remove('key_ttl')</var-button>
    <var-button block type="warning" @click="remove('key_ttl_compress')">remove('key_ttl_compress')</var-button>
    <var-button block type="danger" @click="clear">clear all</var-button>
    <var-button block type="info" @click="statsCache">stats {{ stats_cache }}</var-button>
  </var-card>
</template>