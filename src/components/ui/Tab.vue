<script setup>
const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
    <div class="tab" v-if="props.active">
        <slot />
    </div>
</template>

<style scoped lang="scss">

</style>
