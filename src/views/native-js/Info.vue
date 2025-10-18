<script setup>
import { onMounted, ref } from 'vue';

const info = ref({
    storage: {
        estimate: {},
        getDirectory: {},
        persist: {},
        persisted: {},
    },
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    language: navigator.language,
    languages: navigator.languages,
    maxTouchPoints: navigator.maxTouchPoints,
    onLine: navigator.onLine,
    pdfViewerEnabled: navigator.pdfViewerEnabled,
    platform: navigator.platform,
    plugins: pluginsFun(),
    userAgent: navigator.userAgent,
    userAgentData: navigator.userAgentData,
    vendor: navigator.vendor,
    webdriver: navigator.webdriver,
    gpu: {},
})
function pluginsFun() {
    let p = [];
    for (let plugin of navigator.plugins) {
        p.push({
            name: plugin.name,
            filename: plugin.filename,
        })
    }
    return p;
}
function gpuFun() {
    navigator.gpu.requestAdapter().then(res => {
        // console.log(res);
        info.value.gpu = {
            features: { size: res.features.size },
            info: {
                architecture: res.info.architecture,
                description: res.info.description,
                device: res.info.device,
                isFallbackAdapter: res.info.isFallbackAdapter,
                subgroupMaxSize: res.info.subgroupMaxSize,
                subgroupMinSize: res.info.subgroupMinSize,
                vendor: res.info.vendor,
            },
            isFallbackAdapter: res.isFallbackAdapter,
            limits: {
                maxBindGroups: res.limits.maxBindGroups,
                maxBindGroupsPlusVertexBuffers: res.limits.maxBindGroupsPlusVertexBuffers,
                maxBindingsPerBindGroup: res.limits.maxBindingsPerBindGroup,
                maxBufferSize: res.limits.maxBufferSize,
                maxColorAttachmentBytesPerSample: res.limits.maxColorAttachmentBytesPerSample,
                maxColorAttachments: res.limits.maxColorAttachments,
                maxComputeInvocationsPerWorkgroup: res.limits.maxComputeInvocationsPerWorkgroup,
                maxComputeWorkgroupSizeX: res.limits.maxComputeWorkgroupSizeX,
                maxComputeWorkgroupSizeY: res.limits.maxComputeWorkgroupSizeY,
                maxComputeWorkgroupSizeZ: res.limits.maxComputeWorkgroupSizeZ,
                maxComputeWorkgroupStorageSize: res.limits.maxComputeWorkgroupStorageSize,
                maxComputeWorkgroupsPerDimension: res.limits.maxComputeWorkgroupsPerDimension,
                maxDynamicStorageBuffersPerPipelineLayout: res.limits.maxDynamicStorageBuffersPerPipelineLayout,
                maxDynamicUniformBuffersPerPipelineLayout: res.limits.maxDynamicUniformBuffersPerPipelineLayout,
                maxInterStageShaderVariables: res.limits.maxInterStageShaderVariables,
                maxSampledTexturesPerShaderStage: res.limits.maxSampledTexturesPerShaderStage,
                maxSamplersPerShaderStage: res.limits.maxSamplersPerShaderStage,
                maxStorageBufferBindingSize: res.limits.maxStorageBufferBindingSize,
                maxStorageBuffersPerShaderStage: res.limits.maxStorageBuffersPerShaderStage,
                maxStorageTexturesPerShaderStage: res.limits.maxStorageTexturesPerShaderStage,
                maxTextureArrayLayers: res.limits.maxTextureArrayLayers,
                maxTextureDimension1D: res.limits.maxTextureDimension1D,
                maxTextureDimension2D: res.limits.maxTextureDimension2D,
                maxTextureDimension3D: res.limits.maxTextureDimension3D,
                maxUniformBufferBindingSize: res.limits.maxUniformBufferBindingSize,
                maxUniformBuffersPerShaderStage: res.limits.maxUniformBuffersPerShaderStage,
                maxVertexAttributes: res.limits.maxVertexAttributes,
                maxVertexBufferArrayStride: res.limits.maxVertexBufferArrayStride,
                maxVertexBuffers: res.limits.maxVertexBuffers,
                minStorageBufferOffsetAlignment: res.limits.minStorageBufferOffsetAlignment,
                minUniformBufferOffsetAlignment: res.limits.minUniformBufferOffsetAlignment,
            },
        }
    });
}
onMounted(async () => {
    navigator.storage.estimate().then(res => info.value.storage.estimate = res);
    navigator.storage.getDirectory().then(res => info.value.storage.getDirectory = res);
    navigator.storage.persist().then(res => info.value.storage.persist = res);
    navigator.storage.persisted().then(res => info.value.storage.persisted = res);
    gpuFun();
    // navigator.devicePosture.onchang = function () {}
    // navigator.permissions.query({ name: "geolocation" })
})
</script>
<template>
    <var-card :title="item" v-for="item in Object.keys(info)"> {{ info[item] }}</var-card>
</template>