<script setup>
import {Terminal} from "@xterm/xterm"
import {FitAddon} from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css"
import {spawn} from "tauri-pty";
import {platform} from '@tauri-apps/plugin-os';
import {onMounted, onUnmounted} from "vue";

const term = new Terminal({
  convertEol: true,
  windowsMode: false,
});

onMounted(() => {
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(document.getElementById('terminal'));
  fitAddon.fit();
  addEventListener('resize', () => fitAddon.fit());
});
onUnmounted(() => {
  pty.kill(); // kill ==> [powershell.exe ||  bash]
  // TODO 控制台窗体主机没有退出
})

const pty = spawn(platform() === "windows" ? "powershell.exe" : "bash", [], {
  cols: term.cols,
  rows: term.rows,
});
pty.onData(data => {
  term.write(new Uint8Array(data))
});
pty.onExit(({exitCode}) => {
  term.write(`\n\nProgram exit: ${exitCode}`)
})
term.onData(data => pty.write(data));
term.onResize(e => pty.resize(e.cols, e.rows));
</script>

<template>
  <div id="terminal"/>
</template>
<style scoped>
#terminal {
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: black;
}
</style>
