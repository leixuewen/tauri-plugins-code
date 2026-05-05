<script setup>
import {onBeforeMount, ref} from "vue";
import {Snackbar} from "@varlet/ui";

const cacheStorage = ref([]);

onBeforeMount(getCacheStorage)

function getCacheStorage() {
  caches.keys().then(names => {
    let c = {};
    Promise.all(names.map(m => caches.open(m)
            .then(cache => cache.keys()
                .then(val => c[m] = val)
            )
        )
    ).then(v => {
      // console.log(v);
      cacheStorage.value = c;
    }).catch(err => Snackbar.error(err));
  })
}

function add(item) {
  caches.open(item || window.crypto.randomUUID()).then(cache => {
        // cache.add()
        return cache.addAll([
          "/age_gender_model-weights_manifest.json",
          "/face_expression_model-weights_manifest.json",
        ])
      }
  ).then(() => {
    queueMicrotask(getCacheStorage)
  }).catch(err => Snackbar.error(err));
}

function put(item, item1) {
  caches.open(item).then(cache => {
    return cache.put(item1.url, new Response("缓存内容", {status: 200}))
  }).then(getCacheStorage).catch(err => Snackbar.error(err));
}

function delete1(item, item1) {
  caches.open(item).then(cache => cache.delete(item1)).then(getCacheStorage).catch(err => Snackbar.error(err));
}

function matchAll(item) {
  caches.open(item).then(cache => cache.matchAll()).then(val => {
    console.info(val);
    Snackbar.success(val);
  }).catch(err => Snackbar.error(err));
}

function match(item1) {
  caches.match(item1).then(val => {
    return val.text()
  }).then(val => {
    Snackbar.success(val);
  }).catch(err => Snackbar.error(err));
}

function del(item) {
  delete cacheStorage.value[item];
  return window.caches.delete(item);
}

function clean() {
  Promise.all(Object.keys(cacheStorage.value).map(m => del(m)))
      .then(getCacheStorage)
      .catch(err => Snackbar.error(err));
}
</script>

<template>
  <var-card title="CacheStorage">
    <var-card :title="item" v-for="item in Object.keys(cacheStorage)" :key="item">
      <var-card :title="item1.url" v-for="item1 in cacheStorage[item]">
        <div style="display: flex">
          <var-button block type="warning" @click="put(item,item1)">put('缓存内容')</var-button>
          <var-button block type="primary" @click="match(item1)">match</var-button>
          <var-button block type="danger" @click="delete1(item,item1)">delete</var-button>
        </div>
      </var-card>
      <template #description>
        <div style="display: flex">
          <var-button block type="success" @click="add(item)">add data</var-button>
          <var-button block type="primary" @click="matchAll(item)">matchAll</var-button>
          <var-button block type="danger" @click="del(item)">delete all</var-button>
        </div>
      </template>
    </var-card>
    <var-button block type="info" @click="add()">add caches</var-button>
    <var-button block type="danger" @click="clean">clean caches</var-button>
  </var-card>
</template>