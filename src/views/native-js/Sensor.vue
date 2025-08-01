<script setup>
import { onUnmounted, ref } from 'vue';

onUnmounted(() => {
    gyroscopeStop();
    accelerometerStop();
    gravitySensorStop();
    linearAccelerationSensorStop();
});

const gravitySensorInfo = ref({ x: '0', y: '0', z: '0' });
let gravitySensor;
function gravitySensorStart() {
    if (!gravitySensor) {
        gravitySensor = new GravitySensor({ frequency: 5 });
        gravitySensor.addEventListener("reading", (e) => {
            // console.log(gravitySensor);
            gravitySensorInfo.value.x = gravitySensor.x + '';
            gravitySensorInfo.value.y = gravitySensor.y + '';
            gravitySensorInfo.value.z = gravitySensor.z + '';
        });
        gravitySensor.start();
    }

}

function gravitySensorStop() {
    if (gravitySensor) {
        gravitySensor.removeEventListener('reading', () => { });
        gravitySensor.stop();
        gravitySensor = null;
    }
}

const linearAccelerationSensorInfo = ref({ x: '0', y: '0', z: '0' });
let linearAccelerationSensor;
function linearAccelerationSensorStart() {
    if (!linearAccelerationSensor) {
        linearAccelerationSensor = new LinearAccelerationSensor({ frequency: 5 });
        linearAccelerationSensor.addEventListener("reading", (e) => {
            // console.log(linearAccelerationSensor);
            linearAccelerationSensorInfo.value.x = linearAccelerationSensor.x + '';
            linearAccelerationSensorInfo.value.y = linearAccelerationSensor.y + '';
            linearAccelerationSensorInfo.value.z = linearAccelerationSensor.z + '';
        });
        linearAccelerationSensor.start();
    }

}

function linearAccelerationSensorStop() {
    if (linearAccelerationSensor) {
        linearAccelerationSensor.removeEventListener('reading', () => { });
        linearAccelerationSensor.stop();
        linearAccelerationSensor = null;
    }
}

const gyroscopeInfo = ref({ x: '0', y: '0', z: '0' });
let gyroscope;
function gyroscopeStart() {
    if (!gyroscope) {
        gyroscope = new Gyroscope({ frequency: 5 });
        gyroscope.addEventListener("reading", (e) => {
            // console.log(gyroscope);
            gyroscopeInfo.value.x = gyroscope.x + '';
            gyroscopeInfo.value.y = gyroscope.y + '';
            gyroscopeInfo.value.z = gyroscope.z + '';
        });
        gyroscope.start();
    }

}

function gyroscopeStop() {
    if (gyroscope) {
        gyroscope.removeEventListener('reading', () => { });
        gyroscope.stop();
        gyroscope = null;
    }
}

const accelerometerInfo = ref({ x: '0', y: '0', z: '0' });
let accelerometer;
function accelerometerStart() {
    if (!accelerometer) {
        accelerometer = new Accelerometer({ frequency: 5 });
        accelerometer.addEventListener("reading", (e) => {
            // console.log(accelerometer);
            accelerometerInfo.value.x = accelerometer.x + '';
            accelerometerInfo.value.y = accelerometer.y + '';
            accelerometerInfo.value.z = accelerometer.z + '';
        });
        accelerometer.start();
    }

}

function accelerometerStop() {
    if (accelerometer) {
        accelerometer.removeEventListener('reading', () => { });
        accelerometer.stop();
        accelerometer = null;
    }
}

</script>
<template>
    <var-card title="Accelerometer">
        <var-cell title="x" :description="accelerometerInfo.x" />
        <var-cell title="y" :description="accelerometerInfo.y" />
        <var-cell title="z" :description="accelerometerInfo.z" />
        <var-button block type="primary" @click="accelerometerStart">start</var-button>
        <var-button block type="danger" @click="accelerometerStop">stop</var-button>
    </var-card>
    <var-card title="Gyroscope">
        <var-cell title="x" :description="gyroscopeInfo.x" />
        <var-cell title="y" :description="gyroscopeInfo.y" />
        <var-cell title="z" :description="gyroscopeInfo.z" />
        <var-button block type="primary" @click="gyroscopeStart">start</var-button>
        <var-button block type="danger" @click="gyroscopeStop">stop</var-button>
    </var-card>
    <var-card title="GravitySensor">
        <var-cell title="x" :description="gravitySensorInfo.x" />
        <var-cell title="y" :description="gravitySensorInfo.y" />
        <var-cell title="z" :description="gravitySensorInfo.z" />
        <var-button block type="primary" @click="gravitySensorStart">start</var-button>
        <var-button block type="danger" @click="gravitySensorStop">stop</var-button>
    </var-card>
    <var-card title="LinearAccelerationSensor">
        <var-cell title="x" :description="linearAccelerationSensorInfo.x" />
        <var-cell title="y" :description="linearAccelerationSensorInfo.y" />
        <var-cell title="z" :description="linearAccelerationSensorInfo.z" />
        <var-button block type="primary" @click="linearAccelerationSensorStart">start</var-button>
        <var-button block type="danger" @click="linearAccelerationSensorStop">stop</var-button>
    </var-card>
</template>