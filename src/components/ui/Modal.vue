<script setup>
const emits = defineEmits(["update:show"])
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});

const hideModal = () => {
    emits('update:show', false)
}

</script>

<template>
    <div class="modal" v-if="props.show" @click="hideModal">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;

    &-content {
        margin: auto;
        background: $white;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
