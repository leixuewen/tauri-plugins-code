<script setup>
import {ref} from "vue";

const fonts = ref([]);

function getLocalFonts() {
  window.queryLocalFonts().then(val => {
    fonts.value = val;
    console.log(val);
  })
}
</script>

<template>
  <var-card>
    <var-button block @click="getLocalFonts">getLocalFonts({{ fonts.length }})</var-button>
    <var-card v-for="item in fonts">
      <div style="display: flex">
        <var-card title="family" :description="item.family"/>
        <var-card title="fullName" :description="item.fullName"/>
        <var-card title="postscriptName" :description="item.postscriptName"/>
        <var-card title="style" :description="item.style"/>
      </div>
    </var-card>
  </var-card>
</template>