<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
    <main>
        <Header />
        <router-view></router-view>
    </main>
</template>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
