<route>
{meta: {
description: "This plugin provides a persistent key-value store. This is one of many options to handle state in your application.",
}}
</route>
<script setup>
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { Snackbar } from '@varlet/ui';

async function checkUpdate() {
    const update = await check();
    if (update) {
        Snackbar.info(`found update ${update.version} from ${update.date} with notes ${update.body}`);
        console.log(
            `found update ${update.version} from ${update.date} with notes ${update.body}`
        );
        let downloaded = 0;
        let contentLength = 0;
        // alternatively we could also call update.download() and update.install() separately
        await update.downloadAndInstall((event) => {
            switch (event.event) {
                case 'Started':
                    contentLength = event.data.contentLength;
                    Snackbar.info(`started downloading ${event.data.contentLength} bytes`);
                    console.log(`started downloading ${event.data.contentLength} bytes`);
                    break;
                case 'Progress':
                    downloaded += event.data.chunkLength;
                    Snackbar.info(`downloaded ${downloaded} from ${contentLength}`);
                    console.log(`downloaded ${downloaded} from ${contentLength}`);
                    break;
                case 'Finished':
                    Snackbar.info('download finished');
                    console.log('download finished');
                    break;
            }
        });

        console.log('update installed');
        await relaunch();
    }
}
</script>
<template>
    <var-card>
        <!-- <var-overlay v-model:show="show" /> -->
        <!-- <var-progress :value="20" /> -->
        <var-button type="primary" block @click="checkUpdate">check update</var-button>
    </var-card>
</template>