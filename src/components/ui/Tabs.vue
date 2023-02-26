<script setup>

defineEmits(['click']);
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    activeTab: {
        type: [String, Number],
        default: ""
    }
});

</script>

<template>
    <div class="tabs">
        <div class="tabs-items">
            <div
                v-for="(tab, index) in props.data"
                :key="index"
                :class="{
                active: props.activeTab === tab.value
            }"
                class="tabs-title"
            >
                <a
                    class="tabs-link"
                    href="#"
                    @click.prevent="$emit('click', tab.value)"
                >
                    {{ tab.label }}
                </a>
            </div>
        </div>
        <div class="tabs-content">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabs {
    padding-bottom: 30px;
    @media only screen and (max-width: $tablet) {
        padding: 30px 0;
    }

    &-items {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding-bottom: 20px;
    }

    &-link {
        text-decoration: none;
        font-size: 20px;
        font-weight: 500;
        color: $black;
        border-bottom: 1px solid transparent;
        &:hover {
            color: #9a9aff;
        }
        @media only screen and (max-width: $mobile) {
            font-size: 16px;
        }
    }

    .active {
        .tabs-link {
            color: #353589;
            border-bottom-color: #353589;
        }
    }
}
</style>
