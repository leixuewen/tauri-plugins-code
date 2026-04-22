<script setup>
import {ref} from "vue";

const fonts = ref([]);
getLocalFonts()
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
    <var-table scroller-height="calc(100vh - 122px)">
      <thead style="position: sticky; top: 0">
      <tr>
        <th>family</th>
        <th>fullName</th>
        <th>postscriptName</th>
        <th>style</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in fonts">
        <td>{{ item.family }}</td>
        <td>{{ item.fullName }}</td>
        <td>{{ item.postscriptName }}</td>
        <td>{{ item.style }}</td>
      </tr>
      </tbody>
    </var-table>
  </var-card>
</template>