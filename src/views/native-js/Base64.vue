<script setup>
import {ref} from "vue";

const text = ref();
const text2 = ref();
const encoder = new TextEncoder();

function base64ToStr() {
  let str = String.fromCharCode.apply(null, encoder.encode(text.value));
  // console.log(str);
  text2.value = btoa(str);
}

function strToBase64() {
  text.value = atob(text2.value);
}

function exchange() {
  let a = text.value;
  text.value = text2.value;
  text2.value = a;
}
</script>
<template>
  <var-card title="base64">
    <var-input textarea variant="outlined" placeholder="string" v-model="text"/>
    <var-button style="margin: 10px" type="info" @click="base64ToStr">btoa</var-button>
    <var-button style="margin: 10px" class="m3" type="primary" @click="strToBase64">atob</var-button>
    <var-button style="margin: 10px" class="m3" type="success" @click="exchange">exchange</var-button>
    <var-button style="margin: 10px" class="m3" type="danger" @click="text = '';text2 = '';">clean</var-button>
    <var-input textarea variant="outlined" placeholder="base64" v-model="text2"/>
  </var-card>
</template>