<script setup>
import { LogicalPosition, LogicalSize } from '@tauri-apps/api/dpi';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { onBeforeMount, ref } from 'vue';

const factor = ref();
const position = ref();
const size = ref();
const positionPhysical = ref();
const sizePhysical = ref();
const innerSize = ref();

onBeforeMount(() => {
    const appWindow = getCurrentWindow();

    appWindow.scaleFactor().then(val => {
        factor.value = val;

        position.value = new LogicalPosition(400, 500);
        size.value = new LogicalSize(400, 500);

        positionPhysical.value = position.value.toPhysical(val);
        sizePhysical.value = size.value.toPhysical(val);

        appWindow.innerSize().then(_size => {
            innerSize.value = _size.toLogical(val);
        });
    });
});

</script>
<template>
    <var-card>
        <var-cell title="factor" :description="factor" />
        <var-cell title="position" :description="position" />
        <var-cell title="size" :description="size" />
        <var-cell title="positionPhysical" :description="positionPhysical" />
        <var-cell title="sizePhysical" :description="sizePhysical" />
        <var-cell title="innerSize" :description="innerSize" />
    </var-card>
</template>