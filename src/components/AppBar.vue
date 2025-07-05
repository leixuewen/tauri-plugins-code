<template>
    <var-app-bar :title="$route.name.toString()" title-position="center">
        <template #left>
            <var-button @click="$router.back()" text-color="#fff" round text>
                <var-icon name="chevron-left" />
            </var-button>
        </template>
    </var-app-bar>
</template>