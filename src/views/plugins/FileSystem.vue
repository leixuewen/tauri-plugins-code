<route>
{meta: {
description: "Access the file system.",
}}
</route>
<script setup>
import { create, writeTextFile, writeFile, readFile, watchImmediate, watch, readDir, truncate, stat, remove, rename, copyFile, readTextFileLines, mkdir, exists, open, readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { onUnmounted, ref } from 'vue';
import { Snackbar } from '@varlet/ui';
import TauriApiPath from "../../views/tauri-api/Path.vue";

const expand = ref(false);
const path = ref('config.json');
const baseDir = ref(BaseDirectory.AppConfig);

async function createFun() {
    try {
        const file = await create('bar.txt', { baseDir: BaseDirectory.AppLocalData });
        await file.write(new TextEncoder().encode('Hello world'));
        await file.close();
        Snackbar.success('create bar.txt Successfully !');
    } catch (err) {
        Snackbar.error(err);
    }
}

function mkdirFun(_path, _baseDir) {
    mkdir(_path, {
        baseDir: _baseDir || baseDir.value
    }).then(res => {
        Snackbar.success('mkdir directories Successfully !');
    }).catch(err => {
        Snackbar.error(err);
    });
}

async function writeText() {
    let bool = await exists(path.value, {
        baseDir: baseDir.value
    });
    if (!bool) {
        mkdirFun('');
    }

    const contents = JSON.stringify({ notifications: true });
    writeTextFile(path.value, contents, {
        baseDir: baseDir.value,
    }).then(res => {
        Snackbar.success('writeText Successfully !');
    }).catch(err => {
        Snackbar.error(err);
    });
}

function writeBin() {
    let encoder = new TextEncoder();
    let data = encoder.encode("Hello World");
    writeFile('config', data, {
        baseDir: baseDir.value,
    }).then(res => {
        Snackbar.success('writeBin Successfully !');
    }).catch(err => {
        Snackbar.error(err);
    })
}

function readText() {
    readTextFile(path.value, {
        baseDir: baseDir.value,
    }).then(res => {
        Snackbar.success(res);
    }).catch(err => {
        Snackbar.error(err);
    })
}

async function openReadOnly() {
    const file = await open(path.value, {
        read: true,
        baseDir: baseDir.value,
    });

    const stat = await file.stat();
    const buf = new Uint8Array(stat.size);
    await file.read(buf);
    const textContents = new TextDecoder().decode(buf);
    Snackbar.info(textContents);
    await file.close();
}

async function openWriteOnly() {
    const file = await open('config', {
        write: true,
        baseDir: baseDir.value,
    });
    await file.write(new TextEncoder().encode('Hello world'));
    await file.close();
    Snackbar.success('openWriteOnly Successfully');
}

async function openAppend() {
    const file = await open('config', {
        append: true,
        baseDir: baseDir.value,
    });
    await file.write(new TextEncoder().encode('world'));
    await file.close();
}

async function openTruncate() {
    const file = await open('config', {
        write: true,
        truncate: true,
        baseDir: baseDir.value,
    });
    await file.write(new TextEncoder().encode('world'));
    await file.close()
}

async function openCreate() {
    const file = await open('open', {
        write: true,
        create: true,
        baseDir: baseDir.value,
    });
    await file.write(new TextEncoder().encode('world'));
    await file.close();
}

async function openCreateNew() {
    try {
        const file = await open('open', {
            write: true,
            createNew: true,
            baseDir: baseDir.value,
        });
        await file.write(new TextEncoder().encode('world'));
        await file.close();
    } catch (err) {
        Snackbar.error(err);
    }

}


async function readTextFileLinesFun() {
    const lines = await readTextFileLines(path.value, {
        baseDir: baseDir.value,
    });
    for await (const line of lines) {
        console.log(line);
    }
}

async function readFileFun() {
    const icon = await readFile('open', {
        baseDir: baseDir.value,
    });
    console.log(icon);
}

function removeFun() {
    remove('open', { baseDir: baseDir.value }).then(res => {
        Snackbar.success("remove Successfully");
    }).catch(err => {
        Snackbar.error(err);
    });
}

function copyFileFun() {
    copyFile('open', 'open.bk', {
        fromPathBaseDir: baseDir.value,
        toPathBaseDir: baseDir.value,
    }).then(res => {
        Snackbar.success("copyFile Successfully");
    }).catch(err => {
        Snackbar.error(err);
    });
}

function statFun() {
    stat('config.json', {
        baseDir: baseDir.value,
    }).then(res => {
        Snackbar.info(JSON.stringify(res));
    }).catch(err => {
        Snackbar.error(err);
    });
}

function renameFun() {
    rename('open.bk', 'open.bk2', {
        oldPathBaseDir: baseDir.value,
        newPathBaseDir: baseDir.value,
    }).then(res => {
        Snackbar.success("rename Successfully");
    }).catch(err => {
        Snackbar.error(err);
    });
}

function truncateFun() {
    truncate('open', 0, {
        baseDir: baseDir.value
    }).then(res => {
        Snackbar.success("truncate 0 Successfully");
    }).catch(err => {
        Snackbar.error(err);
    });

}

async function truncateFun2() {
    const filePath = 'open';
    await writeTextFile(filePath, 'Hello World', {
        baseDir: baseDir.value
    });
    await truncate(filePath, 7, {
        baseDir: baseDir.value
    });
    const data = await readTextFile(filePath, {
        baseDir: baseDir.value
    });
    Snackbar.info(data);
}

function readDirFun(_path, _baseDir) {
    readDir(_path, {
        baseDir: _baseDir
    }).then(res => {
        Snackbar.info(JSON.stringify(res));
    }).catch(err => {
        Snackbar.error(err);
    });
}

function removeDirFun(_path, _baseDir) {
    remove(_path, {
        baseDir: _baseDir,
        // recursive: true, // Defaults to `false`. If set to `true`, path will be removed even if it's a non-empty directory
    }).then(res => {
        Snackbar.success("remove dirs Successfully");
    }).catch(err => {
        Snackbar.error(err);
    });
}

function existsFun(_path, _baseDir) {
    exists(_path, {
        baseDir: _baseDir,
    }).then(res => {
        res ? Snackbar.success(res) : Snackbar.warning(res);
    }).catch(err => {
        Snackbar.error(err);
    });
}

function statDirFun(_path, _baseDir) {
    stat(_path, {
        baseDir: baseDir.value,
    }).then(res => {
        Snackbar.info(JSON.stringify(res));
    }).catch(err => {
        Snackbar.error(err);
    });
}

function unwatchFn() { };
async function watchFun() {
    unwatchFn = await watch('open',
        (event) => {
            Snackbar.info(JSON.stringify(event));
        },
        {
            baseDir: baseDir.value,
            delayMs: 500,
        }
    ).catch(err => {
        Snackbar.error(err);
    });
}

function unwatchFns() { };
async function watchImmediateFun() {
    unwatchFns = await watchImmediate('open',
        (event) => {
            Snackbar.info(JSON.stringify(event));
        },
        {
            baseDir: baseDir.value,
            recursive: true,
        }
    ).catch(err => {
        Snackbar.error(err);
    });
}

onUnmounted(() => {
    unwatchFn();
    unwatchFns();
});

</script>
<template>
    <var-button size="large" text type="primary">DIR</var-button>
    <var-switch v-model="expand" />
    <var-collapse-transition :expand="expand">
        <TauriApiPath />
    </var-collapse-transition>

    <var-card title="Files">
        <var-button type="primary" block @click="createFun">create : $AppLocalData/bar.txt</var-button>
        <var-button type="info" block @click="writeText">writeTextFile : $AppConfig/config.json</var-button>
        <var-button type="info" block @click="readText">readTextFile : $AppConfig/config.json</var-button>
        <var-button type="default" block @click="writeBin">write bin: $AppConfig/config</var-button>
        <var-button type="warning" block @click="openReadOnly">open read-only: $AppConfig/config.json</var-button>
        <var-button type="warning" block @click="openWriteOnly">open write-only: $AppConfig/config</var-button>
        <var-button type="warning" block @click="openAppend">open append: $AppConfig/config</var-button>
        <var-button type="warning" block @click="openTruncate">open truncate: $AppConfig/config</var-button>
        <var-button type="warning" block @click="openCreate">open create: $AppConfig/open</var-button>
        <var-button type="warning" block @click="openCreateNew">open createNew: $AppConfig/open</var-button>
        <var-button type="default" block @click="readTextFileLinesFun">readTextFileLines:
            $AppConfig/config.json</var-button>
        <var-button type="success" block @click="readFileFun">readFile: $AppConfig/open</var-button>
        <var-button type="danger" block @click="removeFun">remove: $AppConfig/open</var-button>
        <var-button type="primary" block @click="copyFileFun">copyFile: $AppConfig/open</var-button>
        <var-button type="info" block @click="statFun">stat: $AppConfig/config.json</var-button>
        <var-button type="danger" block @click="renameFun">rename: $AppConfig/open.bk</var-button>
        <var-button type="default" block @click="truncateFun">truncate: $AppConfig/open</var-button>
        <var-button type="default" block @click="truncateFun2">truncate: $AppConfig/open</var-button>
    </var-card>
    <var-card title="Directories">
        <var-button type="primary" block @click="mkdirFun('dirs', BaseDirectory.AppData)">mkdir: $AppData/dirs</var-button>
        <var-button type="default" block @click="readDirFun('dirs', BaseDirectory.AppData)">readDir: $AppData/dirs</var-button>
        <var-button type="danger" block @click="removeDirFun('dirs', BaseDirectory.AppData)">remove: $AppData/dirs</var-button>
        <var-button type="info" block @click="existsFun('dirs', BaseDirectory.AppData)">exists: $AppData/dirs</var-button>
        <var-button type="success" block @click="statDirFun('dirs', BaseDirectory.AppData)">stat: $AppData/dirs</var-button>
    </var-card>
    <var-card title="Watching-Changes">
        <var-button type="danger" block @click="watchFun">watch: $AppConfig/open</var-button>
        <var-button type="danger" block @click="watchImmediateFun">watchImmediate: $AppConfig/open</var-button>
    </var-card>
</template>