<script setup>
import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { onMounted, onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';
import { Menu, MenuItem } from '@tauri-apps/api/menu';

/**
 * @type {import('vue').Ref<TrayIcon>}
 */
const tray = ref();
const isVisible = ref(true);

onMounted(async () => {
    TrayIcon.removeById(sessionStorage.__TrayIcon_id);
    tray.value = await TrayIcon.new({
        icon: await defaultWindowIcon(),
        tooltip: 'awesome tray tooltip',
    });
    sessionStorage.__TrayIcon_id = tray.value.id;
});
onUnmounted(() => {
    TrayIcon.removeById(sessionStorage.__TrayIcon_id);
});

function setTitleFun() {
    tray.value.setTitle(Math.random()).catch(err => {
        Snackbar.error(err);
    })
}

function setTooltipFun() {
    tray.value.setTooltip(Math.random()).catch(err => {
        Snackbar.error(err);
    })
}

function setVisibleFun() {
    tray.value.setVisible(isVisible.value).then(() => {
        isVisible.value = !isVisible.value;
    }).catch(err => {
        Snackbar.error(err);
    })
}

async function menuFun() {
    let items = [];
    for (let i = 1; i <= 9; i++) {
        items.push(await MenuItem.new({
            text: "item" + i,
            enabled: !(i % 2),
            action(id) {
                console.log(id);
                Snackbar.info("item" + i);
            }
        }))
    }
    // Cannot read private member from an object whose class did not declare it
    // Cannot read private member from an object whose class did not declare it
    // Cannot read private member from an object whose class did not declare it
    // tray.value.setMenu(await Menu.new({ items }));
    // tray.value.setShowMenuOnLeftClick(true);

    TrayIcon.removeById(sessionStorage.__TrayIcon_id);
    tray.value = await TrayIcon.new({
        icon: await defaultWindowIcon(),
        tooltip: 'awesome tray tooltip',
        menu: await Menu.new({ items }),
    });
    sessionStorage.__TrayIcon_id = tray.value.id;
}

</script>
<template>
    <var-card title="TrayIcon">
        <var-button type="primary" block @click="setTitleFun">setTitle</var-button>
        <var-button type="info" block @click="setTooltipFun">setTooltip</var-button>
        <var-button type="warning" block @click="setVisibleFun">setVisible</var-button>
        <var-button type="success" block @click="menuFun">menu</var-button>
    </var-card>
</template>