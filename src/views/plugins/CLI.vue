<script setup>
import { getMatches } from '@tauri-apps/plugin-cli';
import { ref } from 'vue';

const args = ref({});
const argsVale = ref({
    positional: false,
    named: false,
    flag: false,
});
const subcommand = ref({});
const subcommandArgs = ref({
    run: {
        debug: false,
        release: false,
    },
});


getMatches().then(res => {
    args.value = res.args;

    argsVale.value.positional = res.args.source.value || res.args.destination.value;
    argsVale.value.named = res.args.type.value;
    if (res.args.verbose) {
        argsVale.value.flag = res.args.verbose.value;
    }

    if (res.subcommand) {
        subcommand.value = res.subcommand;
        let args = res.subcommand.matches.args;
        subcommandArgs.value[res.subcommand.name].debug = args.debug.value;
        subcommandArgs.value[res.subcommand.name].release = args.release.value;
    }
});
</script>
<template>
    <var-cell>{{ args }}</var-cell>
    <var-card title="Run Arge Example:">
        <var-cell :icon="argsVale.positional ? 'checkbox-marked' : 'checkbox-blank-outline'"
            description="/your-app tauri.txt dest.txt" title="Positional Arguments:" />
        <var-cell :icon="argsVale.named ? 'checkbox-marked' : 'checkbox-blank-outline'"
            description="./your-app -t foo -t bar" title="Named Arguments:" />
        <var-cell :icon="argsVale.flag ? 'checkbox-marked' : 'checkbox-blank-outline'"
            description="/your-app -v -v -v 📌 ./your-app --verbose --verbose --verbose 📌 ./your-app -vvv"
            title="Flag Arguments:" />
    </var-card>
    <var-cell>{{ subcommand }}</var-cell>
    <var-card title="Run Subcommand Arge Example:">
        <var-cell :icon="subcommandArgs.run.debug ? 'checkbox-marked' : 'checkbox-blank-outline'"
            title="/your-app run --debug" />
        <var-cell :icon="subcommandArgs.run.release ? 'checkbox-marked' : 'checkbox-blank-outline'"
            title="/your-app run --release" />
    </var-card>
</template>