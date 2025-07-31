<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    Notification.requestPermission();
})

function newNotification() {
    new Notification("待办列表", { body: "待办列表", requireInteraction: true });
}

</script>
<template>
    <var-card>
        <var-button block type="primary" @click="newNotification">newNotification</var-button>
    </var-card>
</template>