<script setup>
import { isAvailable, scan, TechKind, write, textRecord, uriRecord } from '@tauri-apps/plugin-nfc';
import { Snackbar } from '@varlet/ui';
import { ref } from 'vue';

const canScanNfc = ref();
async function isAvailableFun() {
    canScanNfc.value = await isAvailable()
}

const tagNFC = ref();
async function scanNFC() {
    let scanType = {
        type: 'ndef', // or 'tag',
    };
    let options = {
        keepSessionAlive: false,
        // configure the messages displayed in the "Scan NFC" dialog on iOS
        message: 'Scan a NFC tag',
        successMessage: 'NFC tag successfully scanned',
    };

    try {
        tagNFC.value = await scan(scanType, options);
    } catch (err) {
        Snackbar.error('Scan NFC Error : ' + err);
    }
}

const tagfiltersNFC = ref();
async function filtersNFC() {
    let techLists = [
        // capture anything using NfcF
        [TechKind.NfcF],
        // capture all MIFARE Classics with NDEF payloads
        [TechKind.NfcA, TechKind.MifareClassic, TechKind.Ndef],
    ];
    
    try {
        tagfiltersNFC.value = await scan({
            type: 'ndef', // or 'tag'
            mimeType: 'text/plain',
            uri: {
                scheme: 'https',
                host: 'my.domain.com',
                pathPrefix: '/app',
            },
            techLists,
        })
    } catch (err) {
        Snackbar.error('Scan NFC Error : ' + err);
    }

}

async function writeNFC() {
    let payload = [uriRecord('https://tauri.app'), textRecord('some payload')];

    let options = {
        // the kind is only required if you do not have a scanned tag session alive
        // its format is the same as the argument provided to scan()
        kind: {
            type: 'ndef',
        },
        // configure the messages displayed in the "Scan NFC" dialog on iOS
        message: 'Scan a NFC tag',
        successfulReadMessage: 'NFC tag successfully scanned',
        successMessage: 'NFC tag successfully written',
    };
    let load = Snackbar.loading('write NFC ......');
    write(payload, options).then(res => {
        Snackbar.success('Write NFC Successfully');
    }).catch(err => {
        Snackbar.error('Write NFC Error : ' + err);
    }).finally(() => {
        load.clear();
    });
}
</script>
<template>
    <var-card title="checking-if-nfc-is-supported">
        <var-button block type="primary" @click="isAvailableFun">isAvailable {{ canScanNfc }}</var-button>
    </var-card>
    <var-card title="scanning-nfc-tags">
        <var-button block type="success" @click="scanNFC">scan</var-button>
        <var-cell>{{ JSON.stringify(tagNFC) }}</var-cell>
        <var-button block type="success" @click="filtersNFC">filters</var-button>
        <var-cell>{{ JSON.stringify(tagfiltersNFC) }}</var-cell>
    </var-card>
    <var-card title="writing-to-nfc-tags">
        <var-button block type="danger" @click="writeNFC">write</var-button>
    </var-card>
</template>