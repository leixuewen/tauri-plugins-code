<script setup>
import {onBeforeMount, onMounted, ref} from 'vue';
import {routes} from 'vue-router/auto-routes';
import {statusbar} from '../const.js';

const active = ref(0);
const tabs = ref([]);
const icons = ['xml', 'plus', 'magnify', 'shopping-outline'];

onBeforeMount(() => {
  routes.forEach((route, index) => {
    if (index === 0) return
    tabs.value.push({
      val: route.children,
      label: route.path.split('/').pop(),
      icon: icons[index - 1],
    });
  })
  active.value = parseInt(sessionStorage.getItem('__Home_active') || '0');
});

function changeFun() {
  sessionStorage.setItem('__Home_active', active.value);
}

onMounted(() => {
  tabs.value.forEach((v, i) => {
    let top = sessionStorage.getItem('__Home_scrollTop_' + i);
    if (top) {
      document.querySelector(`.${v.label}`).scrollTo(0, top);
    }
  });
});

let scroll = null;

function _scroll(e) {
  // console.log(e.target.scrollTop);
  if (scroll) clearTimeout(scroll);
  scroll = setTimeout(() => {
    sessionStorage.setItem('__Home_scrollTop_' + active.value, e.target.scrollTop);
  }, 200);
}
</script>

<template>
  <var-tabs-items v-model:active="active">
    <var-tab-item v-for="tab of tabs" :class="tab.label" @scroll="_scroll"
                  :style="{overflow: 'auto', height: `calc(100vh - ${statusbar} - 54px - 50px)`}">
      <var-cell v-for="item of tab.val" @click="$router.push(item.name)" :title="item.path"
                :description="item.meta?.description || item.name" border>
        <template #extra>
          <var-icon name="chevron-right"/>
        </template>
      </var-cell>
    </var-tab-item>
  </var-tabs-items>
  <var-bottom-navigation fixed v-model:active="active" @change="changeFun">
    <var-bottom-navigation-item v-for="tab of tabs" :label="tab.label" :icon="tab.icon"/>
  </var-bottom-navigation>
</template>
