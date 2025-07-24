<script setup>
import {
    vibrate,
    impactFeedback,
    notificationFeedback,
    selectionFeedback
} from '@tauri-apps/plugin-haptics';
import { Snackbar } from '@varlet/ui';

function vibrateFun() {
    vibrate(1000).then(val => {
        // Snackbar.success(val);
    }).catch(err => {
        Snackbar.error(err);
    })
}

function vibrateFun2() {
    navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
}

function impactFeedbackFun() {
    // 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';
    impactFeedback('medium').then(val => {
        // Snackbar.success(val);
    }).catch(err => {
        Snackbar.error(err);
    })
}

function notificationFeedbackFun() {
    // 'success' | 'warning' | 'error';
    notificationFeedback('warning').then(val => {
        // Snackbar.success(val);
    }).catch(err => {
        Snackbar.error(err);
    })
}

function selectionFeedbackFun() {
    selectionFeedback().then(val => {
        // Snackbar.success(val);
    }).catch(err => {
        Snackbar.error(err);
    })
}
</script>
<template>
    <var-card>
        <var-button type="success" block @click="vibrateFun">vibrate</var-button>
        <var-button type="default" block @click="vibrateFun2">navigator.vibrate</var-button>
        <var-button type="primary" block @click="impactFeedbackFun">impactFeedback</var-button>
        <var-button type="info" block @click="notificationFeedbackFun">notificationFeedback</var-button>
        <var-button type="warning" block @click="selectionFeedbackFun">selectionFeedback</var-button>
    </var-card>
</template>