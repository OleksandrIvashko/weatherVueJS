<script setup>
import {ref} from "vue";

const emits = defineEmits(["update:selected"])
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    selected: {
        type: Object,
        default: () => ({})
    }
});
const isOpen = ref(false);

const onClickItem = (item) => {
    emits("update:selected", item)
};

</script>

<template>
    <div class="dropdown" @click="isOpen = !isOpen">
        <div class="dropdown-active">
            {{ props?.selected?.name || "Select"}}
        </div>
        <div class="dropdown-menu" v-if="isOpen">
            <div
                v-for="(item, index) in props.data"
                :key="index"
                class="dropdown-item"
                @click="onClickItem(item)"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.dropdown {
    background: $white;
    position: relative;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    border-radius: 6px;

    &-menu {
        position: absolute;
        width: 100%;
        background: $white;
        flex-direction: column;
        border-radius: 6px;
        margin-top: 2px;
        left: 0;
        top: 100%;
    }

    &-item {
        padding: 5px;
        font-size: 14px;
        transition: all .3s;
        &:hover {
            background: #9a9aff;
        }
    }

    &-active {
        padding: 4px;
    }
}
</style>