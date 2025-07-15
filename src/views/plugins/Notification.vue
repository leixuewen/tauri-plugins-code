<script setup>
import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
    registerActionTypes,
    onAction,
    createChannel,
    Importance,
    Visibility,
    channels,
    removeChannel,
} from '@tauri-apps/plugin-notification';
import { onMounted, onUnmounted, ref } from 'vue';
import { type } from '@tauri-apps/plugin-os';
import { Snackbar } from '@varlet/ui';
const osType = type();

const permissionGranted = ref(false);
onMounted(() => {
    isPermissionGranted().then(res => {
        permissionGranted.value = res;
    }).catch(err => {
        Snackbar.error('Notification Error : ' + err);
    });
});

async function requestPermissionFun() {
    const permission = await requestPermission();
    permissionGranted.value = permission === 'granted';
}

async function sendNotificationFun(channelId = '') {
    if (!permissionGranted.value) await requestPermissionFun();
    let options = { title: 'Tauri' + channelId, body: 'Tauri is awesome!' + channelId, channelId }
    if (!channelId) {
        delete options.channelId
    }
    sendNotification(options);
}

let pluginListener;
async function registerActionTypesFun() {
    registerActionTypes([
        {
            id: 'messages',
            actions: [
                {
                    id: 'reply',
                    title: 'Reply',
                    input: true,
                    inputButtonTitle: 'Send',
                    inputPlaceholder: 'Type your reply...',
                },
                {
                    id: 'mark-read',
                    title: 'Mark as Read',
                    foreground: false,
                },
            ],
        },
    ]);
    if (!pluginListener) {
        try {
            pluginListener = await onAction((notification) => {
                console.log('Action performed:', notification);
            });
        } catch (err) {
            Snackbar.error(err);
        }
    }

}
onUnmounted(() => {
    if (pluginListener?.plugin) pluginListener.unregister();
});

function attachmentsFun() {
    sendNotification({
        title: 'New Image',
        body: 'Check out this picture',
        attachments: [
            {
                id: 'image-1',
                url: 'asset:///notification-image.jpg',
            },
        ],
    });
}

function createChannelFun() {
    createChannel({
        id: 'messages',
        name: 'Messages',
        description: 'Notifications for new messages',
        importance: Importance.High,
        visibility: Visibility.Private,
        lights: true,
        lightColor: '#ff0000',
        vibration: true,
        sound: 'notification_sound',
    }).catch(err => {
        Snackbar.error(err);
    });
}

const existingChannels = ref([]);
async function getChannels() {
    if (!permissionGranted.value) await requestPermissionFun();
    channels().then(res => existingChannels.value = res).catch(err => {
        Snackbar.error(err);
    });
}

async function removeChannelFun(id) {
    await removeChannel(id);
    await getChannels();
}
</script>
<template>
    <var-card :title="'Notification : ' + permissionGranted">
        <var-button block type="primary" @click="sendNotificationFun()">send-notification</var-button>
        <var-button v-if="['android', 'ios'].includes(osType)" block type="info"
            @click="registerActionTypesFun">actions</var-button>
        <var-button block type="success" @click="attachmentsFun">attachments</var-button>
        <var-button block type="warning" @click="createChannelFun">createChannel</var-button>
        <var-button block @click="getChannels">get channels</var-button>
        <var-cell v-for="item of existingChannels" :key="item.id" :title="item.name" :description="item">
            <template #icon>
                <var-icon size="24" @click="removeChannelFun(item.id)" name="close-circle" />
            </template>
            <template #extra>
                <var-button type="primary" block @click="sendNotificationFun(item.id)">sendNotification</var-button>
            </template>
        </var-cell>
    </var-card>
</template>