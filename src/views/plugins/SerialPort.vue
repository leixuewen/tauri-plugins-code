<script setup>
import {SerialPort} from "tauri-plugin-serialplugin-api";
import {onUnmounted, ref} from "vue";

/**
 * @type {import('vue').Ref<{
 *  [key: string]: {
 *    portInfo: PortInfo,
 *    options: SerialportOptions,
 *    serialPort: SerialPort,
 *    write_data: string,
 *    listen_data: [string],
 *  }
 * }
 * >}
 */
const serialPorts = ref({});

onUnmounted(() => {
  SerialPort.closeAll();
})

function availablePorts() {
  SerialPort.available_ports().then(res => {
    Object.keys(res).forEach(v => serialPorts.value[v].portInfo = res[v]);
  });
  // local test
  serialPorts.value["/dev/ttyUSB0"] = {
    portInfo: {
      path: "/dev/ttyUSB0",
      manufacturer: "Unknown",
      pid: "Unknown",
      product: "Unknown",
      serial_number: "Unknown",
      type: "PCI",
      vid: "Unknown",
    },
    options: {}
  }
}

function openSerialPort(item) {
  let sp = serialPorts.value[item].serialPort;
  if (sp) {
    sp.close();
  }
  let serialPort = new SerialPort({...serialPorts.value[item].options});
  serialPort.open();
  serialPorts.value[item].serialPort = serialPort;
}

function writeSerialPort(item) {
  let data = serialPorts.value[item].write_data;
  serialPorts.value[item].serialPort.write(data);
  data = "";
}

function listeningSerialPort(item) {
  let sp = serialPorts.value[item].serialPort;
  sp.startListening();
  sp.listen((data) => {
    console.log("Received:", data);
    let sps = serialPorts.value[item];
    if (!sps.listen_data) {
      sps.listen_data = []
    }
    sps.listen_data.push(data);
  });
}
</script>

<template>
  <var-card>
    <var-button block @click="availablePorts">List available ports</var-button>
    <var-card :title="`SerialPort [${item}]`" v-for="item in Object.keys(serialPorts)">
      <var-card title="PortInfo">{{ serialPorts[item].portInfo }}</var-card>
      <var-card title="SerialPortOptions">
        <var-input class="input" clearable v-model="serialPorts[item].options.path" placeholder="path"/>
        <var-select class="input" clearable v-model="serialPorts[item].options.baudRate" placeholder="baudRate">
          <var-option :label="item"
                      v-for="item in [110,300,600,1200,2400,4800,9600,14400,19200,38400,57600,115200,230400,460800,921600]"/>
        </var-select>
        <var-input class="input" clearable v-model="serialPorts[item].options.encoding" placeholder="encoding"/>
        <var-select class="input" clearable v-model="serialPorts[item].options.dataBits" placeholder="dataBits">
          <var-option :label="item" v-for="item in ['Five', 'Six', 'Seven','Eight']"/>
        </var-select>
        <var-select class="input" clearable v-model="serialPorts[item].options.flowControl" placeholder="flowControl">
          <var-option :label="item" v-for="item in ['None', 'Software', 'Hardware']"/>
        </var-select>
        <var-select class="input" clearable v-model="serialPorts[item].options.parity" placeholder="flowControl">
          <var-option :label="item" v-for="item in ['None', 'Odd', 'Even']"/>
        </var-select>
        <var-select class="input" clearable v-model="serialPorts[item].options.stopBits" placeholder="flowControl">
          <var-option :label="item" v-for="item in ['One', 'Two']"/>
        </var-select>
        <var-input class="input" clearable v-model="serialPorts[item].options.timeout" type="number"
                   placeholder="timeout"/>
        <var-input class="input" clearable v-model="serialPorts[item].options.size" type="number" placeholder="size"/>
      </var-card>
      <var-cell title="listen_data" v-for="data in serialPorts[item].listen_data">{{ data }}</var-cell>
      <var-card title="Operation">
        <var-button type="success" @click="openSerialPort(item)">open</var-button>
        <var-button type="primary" @click="listeningSerialPort(item)">listening</var-button>
        <var-button type="warning" @click="serialPorts[item].serialPort.cancelListen()">cancelListen</var-button>
        <var-button type="danger" @click="serialPorts[item].serialPort.close()">close</var-button>
        <var-button type="info" @click="serialPorts[item].serialPort.disconnected()">disconnected</var-button>
        <var-input textarea v-model="serialPorts[item].write_data" variant="outlined">
          <template #append-icon>
            <var-button type="success" @click="writeSerialPort(item)">write</var-button>
          </template>
        </var-input>
      </var-card>
    </var-card>
  </var-card>
</template>
<style scoped>
.input {
  display: inline-block;
  width: 30%;
  margin: 1%;
}
</style>