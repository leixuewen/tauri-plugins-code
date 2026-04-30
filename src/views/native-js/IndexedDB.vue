<script setup>
import {Snackbar} from '@varlet/ui';

// 打开或创建一个数据库
let request = indexedDB.open('databaseName', 1);

// 处理数据库升级
request.onupgradeneeded = function (event) {
  console.log(event);
  // 创建对象存储（表）并设置主键
  let objectStore = event.target.result.createObjectStore('storeName', {keyPath: 'id'});
  // 创建索引
  objectStore.createIndex('name', 'id', {unique: false});
};

let idb;
// 数据库打开成功时的回调
request.onsuccess = function (event) {
  console.log(event);
  idb = event.target.result;
};

// 错误处理
request.onerror = function (event) {
  Snackbar.error(JSON.stringify(event.target))
};

function getTxObjectStore(name = 'storeName', storeName = 'storeName', mode = 'readwrite') {
  return idb.transaction(storeName, mode).objectStore(name);
}

function add() {
  for (let i = 0; i < 9; i++) {
    getTxObjectStore().add({id: i, name: new Date().toISOString()});
  }
}

function get() {
  let query = getTxObjectStore().get(1);
  query.onsuccess = function (event) {
    console.log(event.target.result);
    Snackbar.success(JSON.stringify(event.target.result))
  };
  query.onerror = function (event) {
    Snackbar.error(JSON.stringify(event.target.result))
  }
}

function put() {
  for (let i = 0; i < 9; i++) {
    getTxObjectStore().put({id: i, name: new Date().toISOString()});
  }
}

function del() {
  for (let i = 0; i < 9; i++) {
    getTxObjectStore().delete(i);
  }
}

function fff(fn) {
  let query = getTxObjectStore()[fn]();
  // console.log(query);
  query.onsuccess = function (event) {
    Snackbar.success(JSON.stringify(event.target.result))
  };
  query.onerror = function (event) {
    Snackbar.error(JSON.stringify(event.target.error))
  }
}
</script>

<template>
  <var-card title="indexedDB">
    <var-button block type="info" @click="add">add</var-button>
    <var-button block type="primary" @click="get">get</var-button>
    <var-button block type="success" @click="put">put</var-button>
    <var-button block type="warning" @click="del">delete</var-button>
    <var-button block type="danger" @click="fff('clear')">clear</var-button>
    <var-button block type="warning" @click="fff('getAll')">getAll</var-button>
    <var-button block type="danger" @click="fff('getAllKeys')">getAllKeys</var-button>
  </var-card>
</template>