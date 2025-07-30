<script setup>
function vibrate1() {
    // vibrate for 9000ms
    navigator.vibrate(9000);
}
function vibrate2() {
    // Vibrate 'SOS' in Morse.
    navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
}
</script>
<template>
    <var-card>
        <var-button block type="success" @click="vibrate1">vibrate(9000)</var-button>
        <var-button block type="primary" @click="vibrate2">vibrate([...])</var-button>
    </var-card>
</template>