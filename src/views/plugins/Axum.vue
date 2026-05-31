<route>
{meta: {
description: "A Tauri plugin that allows calling Axum Router endpoints directly.",
}}
</route>
<script setup>
import {axum, call_json} from "tauri-plugin-axum-api";
import {fetch as AxumFetch} from "tauri-plugin-axum-api/fetch";
import {Snackbar} from "@varlet/ui";
import {invoke} from "@tauri-apps/api/core";

function axumFetchGet() {
  AxumFetch("/").then((res) => res.text())
      .then((res) => Snackbar.success(res))
      .catch(err => Snackbar.error(err));
}

function axumFetchPost() {
  AxumFetch("/post", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      axum: crypto.randomUUID(),
      tauri: crypto.randomUUID(),
    })
  }).then((res) => res.text())
      .then((res) => Snackbar.success(res))
      .catch(err => Snackbar.error(err));
}

let abortController;

function _streamClose() {
  abortController?.abort();
  abortController = undefined;
}

function axumFetchStream() {
  _streamClose();
  abortController = new AbortController();
  AxumFetch("/stream-body", {
    method: "GET",
    signal: abortController.signal,
  }).then(res => {
    let reader = res.body.getReader();
    readStream(reader);
  }).catch((err) => Snackbar.error(err));
}

/**
 *
 * @param reader {ReadableStreamDefaultReader}
 * @returns {Promise<unknown>}
 */
async function readStream(reader) {
  let decoder = new TextDecoder();
  while (true) {
    let {value, done} = await reader.read();
    if (done) break;
    Snackbar.success(decoder.decode(value, {stream: true}));
  }
}

function axumGet() {
  axum.get("/")
      .then(res => Snackbar.success(res.body))
      .catch(err => Snackbar.error(err));
}

function axumPost() {
  axum.post("/post", {})
      .then(res => Snackbar.success(JSON.stringify(res.body, null, 2)))
      .catch(err => Snackbar.error(err));
}

function callJsonPost() {
  call_json("POST", "/post", {
    axum: crypto.randomUUID(),
    tauri: crypto.randomUUID(),
  }).then(res => Snackbar.success(JSON.stringify(res, null, 2)))
      .catch(err => Snackbar.error(err));
}

function custom_usage() {
  invoke("custom_usage", {}, {
    headers: {
      "x-uri": "/",
      "x-method": "GET",
    },
  }).then(val => {
    console.log(val);
    Snackbar.success(new TextDecoder().decode(new Uint8Array(val.body)));
  }).catch(err => Snackbar.error(err));
}

</script>

<template>
  <var-card title="Axum">
    <var-button block type="info" @click="axumGet">get</var-button>
    <var-button block type="primary" @click="axumPost">post</var-button>
  </var-card>
  <var-card title="AxumFetch">
    <var-button block type="info" @click="axumFetchGet">get</var-button>
    <var-button block type="primary" @click="axumFetchPost">post</var-button>
    <var-button block type="danger" @click="axumFetchStream">stream</var-button>
    <var-button block type="warning" @click="_streamClose">streamClose</var-button>
  </var-card>
  <var-button block @click="callJsonPost">call_json(method, uri, body)</var-button>
  <var-button block @click="custom_usage">custom_usage</var-button>
</template>