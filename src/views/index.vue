<script setup>
import {onBeforeMount, onMounted, ref} from 'vue';
import {routes} from 'vue-router/auto-routes';

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
  if (sessionStorage.__Home_active) {
    active.value = parseInt(sessionStorage.__Home_active);
  }
});

function changeFun() {
  sessionStorage.__Home_active = active.value;
}

onMounted(() => {
  tabs.value.forEach(v => {
    let top = sessionStorage['__Home_scrollTop_' + v.label];
    if (top) {
      // console.log(v.label, top);
      // console.log(document.getElementsByClassName("app " + v.label)[0]);
      document.getElementsByClassName("app " + v.label)[0].scrollTo(0, parseInt(top));
    }
  });
});
let scroll = null;

function scrollFun(e) {
  // console.log(e);
  // console.log(e.target.scrollTop);
  // console.log(e.target.classList[3]);
  if (scroll) clearTimeout(scroll);
  scroll = setTimeout(() => {
    // console.log(e.target.scrollTop, e.target.classList[3]);
    sessionStorage['__Home_scrollTop_' + e.target.classList[3]] = e.target.scrollTop;
  }, 200);
}
</script>

<template>
  <var-tabs-items v-model:active="active">
    <var-tab-item class="app" v-for="tab of tabs" :class="tab.label" @scroll="scrollFun">
      <var-cell v-for="item of tab.val" @click="$router.push(item.name)" :title="item.path"
                :description="item.meta?.description || item.name" border>
        <template #extra>
          <var-icon name="chevron-right"/>
        </template>
      </var-cell>
    </var-tab-item>
  </var-tabs-items>
  <var-bottom-navigation v-model:active="active" @change="changeFun">
    <var-bottom-navigation-item v-for="tab of tabs" :label="tab.label" :icon="tab.icon"/>
  </var-bottom-navigation>
</template>
<style scoped>
.app {
  height: calc(100vh - 104px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
