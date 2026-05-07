<script setup>
import {Snackbar} from "@varlet/ui";

function read() {
  navigator.clipboard.read().then(val => {
    console.log(val);
    let i = val.map(m => {
      return {
        presentationStyle: m.presentationStyle,
        types: m.types,
      }
    });
    Snackbar.info(JSON.stringify(i));
  }).catch(err => Snackbar.error(err))
}

function readText() {
  navigator.clipboard.readText().then(val => {
    console.log(val);
    Snackbar.info(val);
  }).catch(err => Snackbar.error(err))
}

function writeText() {
  navigator.clipboard.writeText(crypto.randomUUID()).then(v => {
    Snackbar.success("OK");
  }).catch(err => Snackbar.error(err))
}
</script>

<template>
  <var-card title="clipboard">
    <var-button block type="warning" @click="read">read</var-button>
    <var-button block type="primary" @click="readText">readText</var-button>
    <var-button block type="success" @click="writeText">writeText(UUID)</var-button>
  </var-card>
</template>