<script setup>
import {
  connect, disconnect, setToken, publish, rpc,
  isConnected,
  helpers,
  utils,
  onConnecting,
  onConnected,
  onDisconnected,
  onPublication,
  onSubscribed,
  onUnsubscribed,
  onSubscribing,
  onAnyMessage,
  onMessage,
  onError,
  onChannelMessage,
  addSubscription,
  removeSubscription,
  getSubscriptions,
  getConnectionState,
} from 'tauri-plugin-centrifugo-api'
import {onMounted, onUnmounted, ref} from "vue";
import {Snackbar} from '@varlet/ui';

/**
 * @type {import('vue').Ref<StartConfig>}
 */
const config = ref({});
const centrifugo = ref({});
const unlistenFns = ref([]);
onUnmounted(() => {
  unlistenFns.value.forEach(v => v());
  isConnected().then(val => {
    if (val) {
      disconnect();
    }
  })
})
onMounted(() => {
  config.value.url = "ws://localhost:8000/connection/websocket";
  config.value.token = "your-jwt-token";
  config.value.name = "client-name";
  // config.value.version = "";
  config.value.channels = ['channel1', 'channel2'];
  config.value.useProtobuf = false;
  // config.value.readTimeout = 5000;
})

function onListeners() {
  onConnecting(eventData => {
    console.log('Connecting...', eventData.payload)
  }).then(res => unlistenFns.value.push(res));
  onConnected((eventData) => {
    console.log('Connected!', eventData.payload)
  }).then(res => unlistenFns.value.push(res));
  onDisconnected((eventData) => {
    console.log('Disconnected:', eventData.payload)
  }).then(res => unlistenFns.value.push(res));
  onError((eventData) => {
    console.log('Error:', eventData.payload)
  }).then(res => unlistenFns.value.push(res));
  onSubscribed((eventData) => {
    console.log('Subscribed to:', eventData.payload.channel)
  }).then(res => unlistenFns.value.push(res));
  onUnsubscribed((eventData) => {
    console.log('Unsubscribed to:', eventData.payload.channel)
  }).then(res => unlistenFns.value.push(res));
  onSubscribing((eventData) => {
    console.log('Subscribing to:', eventData.payload.channel)
  }).then(res => unlistenFns.value.push(res));
  onPublication((eventData) => {
    const {channel, data} = eventData.payload
    console.log(`Publication on ${channel}:`, data)
  }).then(res => unlistenFns.value.push(res));
  onMessage((eventData) => {
    const {channel, data} = eventData
    console.log(`Message on ${channel}:`, data)
  }).then(res => unlistenFns.value.push(res));
  onChannelMessage((eventData) => {
    console.log(`ChannelMessage on :`, eventData);
  }).then(res => unlistenFns.value.push(res));
  onAnyMessage((eventData) => {
    const {channel, data} = eventData;
    console.log(`AnyMessage on ${channel}:`, data, eventData.timestamp)
  }).then(res => unlistenFns.value.push(res));
}
</script>

<template>
  <var-card title="tauri-plugin-centrifugo">
    <var-card title="StartConfig">
      <var-input v-model="config.url" placeholder="url"/>
      <var-input class="input" v-model="config.token" placeholder="token"/>
      <var-input class="input" v-model="config.name" placeholder="name"/>
      <var-input class="input" type="number" v-model="config.readTimeout" placeholder="readTimeout"/>
    </var-card>
    <var-card title="Operation">
      <var-button type="success" @click="connect(config)">connect</var-button>
      <var-button type="success"
                  @click="() => getConnectionState().then(val => centrifugo['getConnectionState'] = val)">
        getConnectionState {{ centrifugo['getConnectionState'] }}
      </var-button>
      <var-button block type="danger" @click="disconnect">disconnect</var-button>
      <var-button type="primary"
                  @click="helpers.publishJson('channel1', {message: 'Hello World', timestamp: Date.now()})">
        helpers.publishJson('channel1', {message: 'Hello World', timestamp: Date.now()})
      </var-button>
      <var-button type="primary"
                  @click="helpers.subscribeToChannel('channel1', data => Snackbar.info(JSON.stringify(data)))">
        helpers.subscribeToChannel('channel1')
      </var-button>
      <var-button type="primary"
                  @click="helpers.subscribeToChannels(['channel1'], data => Snackbar.info(JSON.stringify(data)))">
        helpers.subscribeToChannels(['channel1'])
      </var-button>
      <var-button type="primary"
                  @click="() => helpers.waitForConnection(3000).then(val => centrifugo['waitForConnection'] = val)">
        helpers.waitForConnection(3000) {{ centrifugo['waitForConnection'] }}
      </var-button>
      <var-button type="primary"
                  @click="() => helpers.getConnectionStatus(3).then(val => centrifugo['getConnectionStatus'] = val)">
        helpers.getConnectionStatus(3) {{ centrifugo['getConnectionStatus'] }}
      </var-button>
      <var-button type="success" block @click="publish({channel:'channel1',data: utils.encode('Hello World')})">
        publish({channel:'channel1',data: utils.encode('Hello World')})
      </var-button>
      <var-button type="warning" @click="helpers.rpcJson('', {})">helpers.rpcJson('', {})</var-button>
      <var-button type="warning" @click="rpc({channel:'',data: ''})">rpc({channel:'',data: ''})</var-button>
      <var-button type="info" block @click="onListeners">Listeners</var-button>
      <var-button @click="() => getSubscriptions().then(val => centrifugo['getSubscriptions'] = val)">
        getSubscriptions {{ centrifugo['getSubscriptions'] }}
      </var-button>
      <var-button @click="removeSubscription('channel1')">removeSubscription('channel1')</var-button>
      <var-button @click="addSubscription('channel1')">addSubscription('channel1')</var-button>
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
