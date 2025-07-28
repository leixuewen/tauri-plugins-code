<script setup>
import {
    Menu, MenuItem, Submenu,
    PredefinedMenuItem,
    CheckMenuItem,
    IconMenuItem,
} from '@tauri-apps/api/menu';
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { Image } from '@tauri-apps/api/image';

onBeforeMount(() => {
    Menu.new().then(val => val.setAsAppMenu());;
});
onUnmounted(async () => {
    Menu.new().then(val => val.setAsAppMenu());;
});

async function menuFun1() {
    const menu = await Menu.new({
        items: [
            {
                id: 'quit',
                text: 'Quit',
                action: () => {
                    console.log('quit pressed');
                },
            },
        ],
    });

    // 如果某个窗口未显式创建菜单，或者未显式设置菜单，那么此菜单将被分配给它。
    menu.setAsAppMenu().then((res) => {
        console.log('menu set success', res);
    });
}

async function menuFun2() {
    const menu = await Menu.new({
        items: [
            {
                id: 'Open',
                text: 'open',
                action: () => {
                    console.log('open pressed');
                },
            },
            {
                id: 'Close',
                text: 'close',
                action: () => {
                    console.log('close pressed');
                },
            },
        ],
    });

    await menu.setAsAppMenu();
}

async function submenuFun() {
    const fileSubmenu = await Submenu.new({
        text: 'File',
        items: [
            await MenuItem.new({
                id: 'new',
                text: 'New',
                action: () => {
                    console.log('New clicked');
                },
            }),
            await MenuItem.new({
                id: 'open',
                text: 'Open',
                action: () => {
                    console.log('Open clicked');
                },
            }),
            await MenuItem.new({
                id: 'save_as',
                text: 'Save As...',
                action: () => {
                    console.log('Save As clicked');
                },
            }),
        ],
    });

    const editSubmenu = await Submenu.new({
        text: 'Edit',
        items: [
            await MenuItem.new({
                id: 'undo',
                text: 'Undo',
                action: () => {
                    console.log('Undo clicked');
                },
            }),
            await MenuItem.new({
                id: 'redo',
                text: 'Redo',
                action: () => {
                    console.log('Redo clicked');
                },
            }),
        ],
    });

    const menu = await Menu.new({
        items: [
            fileSubmenu,
            editSubmenu,
            await MenuItem.new({
                id: 'quit',
                text: 'Quit',
                action: () => {
                    console.log('Quit pressed');
                },
            }),
        ],
    });

    menu.setAsAppMenu();
}

async function PredefinedMenuItemFun() {
    const copy = await PredefinedMenuItem.new({
        text: 'copy-text',
        item: 'Copy',
    });

    const separator = await PredefinedMenuItem.new({
        text: 'separator-text',
        item: 'Separator',
    });

    const undo = await PredefinedMenuItem.new({
        text: 'undo-text',
        item: 'Undo',
    });

    const redo = await PredefinedMenuItem.new({
        text: 'redo-text',
        item: 'Redo',
    });

    const cut = await PredefinedMenuItem.new({
        text: 'cut-text',
        item: 'Cut',
    });

    const paste = await PredefinedMenuItem.new({
        text: 'paste-text',
        item: 'Paste',
    });

    const select_all = await PredefinedMenuItem.new({
        text: 'select_all-text',
        item: 'SelectAll',
    });

    const menu = await Menu.new({
        items: [copy, separator, undo, redo, cut, paste, select_all],
    });

    await menu.setAsAppMenu();
}

async function CheckMenuItemFun() {
    let currentLanguage = 'en';

    const check_sub_item_en = await CheckMenuItem.new({
        id: 'en',
        text: 'English',
        checked: currentLanguage === 'en',
        action: () => {
            currentLanguage = 'en';
            check_sub_item_en.setChecked(currentLanguage === 'en');
            check_sub_item_zh.setChecked(currentLanguage === 'cn');
            console.log('English pressed');
        },
    });

    const check_sub_item_zh = await CheckMenuItem.new({
        id: 'zh',
        text: 'Chinese',
        checked: currentLanguage === 'zh',
        action: () => {
            currentLanguage = 'zh';
            check_sub_item_en.setChecked(currentLanguage === 'en');
            check_sub_item_zh.setChecked(currentLanguage === 'zh');
            check_sub_item_zh.setAccelerator('Ctrl+L');
            console.log('Chinese pressed');
        },
    });

    // 从路径加载图标 前端项目路径
    const icon = await Image.fromPath('../public/vue.png');
    const icon2 = await Image.fromPath('../public/vite.png');

    const icon_item = await IconMenuItem.new({
        id: 'icon_item',
        text: 'Icon Item',
        icon: icon,
        action: () => {
            icon_item.setIcon(icon2);
            console.log('icon pressed');
        },
    });

    const text_item = await MenuItem.new({
        id: 'text_item',
        text: 'Text Item',
        action: () => {
            text_item.setText('Text Item Changed');
            console.log('text pressed');
        },
    });

    const menu = await Menu.new({
        items: [
            {
                id: 'change menu',
                text: 'change_menu',
                items: [text_item, check_sub_item_en, check_sub_item_zh, icon_item],
            },
        ],
    });

    await menu.setAsAppMenu();
}

</script>
<template>
    <var-card>
        <var-button block type="primary" @click="menuFun1">menu1</var-button>
        <var-button block type="info" @click="menuFun2">menu2</var-button>
        <var-button block type="success" @click="submenuFun">Submenu</var-button>
        <var-button block type="warning" @click="PredefinedMenuItemFun">PredefinedMenuItem</var-button>
        <var-button block type="danger" @click="CheckMenuItemFun">CheckMenuItem</var-button>
    </var-card>
</template>