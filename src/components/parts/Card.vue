<script setup>
import InputSearch from "@/components/ui/InputSearch.vue";
import defaultImage from "@/assets/img/logo.svg";
import {useLanguages} from "@/composables/useLanguages.js";
import {literals} from "@/constants";

defineEmits(["toggleFavorite", "update:search", "clickAutocomplete"])
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    search: {
        type: String,
        default: ""
    },
    dataAutocomplete: {
        type: Array,
        default: () => []
    },
    isLoadingSearch: {
        type: Boolean,
        default: false
    },
    isShowCitySearch: {
        type: Boolean,
        default: true
    }
});

const storeLanguages = useLanguages();

</script>

<template>
    <div class="card">
        <InputSearch
            v-if="props.isShowCitySearch"
            :modelValue="search"
            :dataAutocomplete="dataAutocomplete"
            :isLoadingSearch="isLoadingSearch"
            @clickAutocomplete="$emit('clickAutocomplete', $event)"
            @update:modelValue="$emit('update:search', $event)"
        />
        <div class="card-icon">
            <img :src="props.data?.weather?.icon || defaultImage" alt="#">
        </div>
        <div class="card-temperature">
            {{ props.data?.weather?.tempMin }}&#xb0; - {{ props.data?.weather?.tempMax }}&#xb0;
        </div>
        <div class="card-info">
            <div class="card-city">
                {{ props.data?.name }}
            </div>
            <div class="card-week">
                {{ props.data?.weather?.dateFormatDay }}
            </div>
        </div>
        <div class="card-time">
            {{ props.data?.weather?.dateFormat }}
        </div>
        <button
            v-if="props.data?.id"
            @click.prevent="$emit('toggleFavorite', props.data)"
            class="card-btn"
        >
            {{
                props.data?.isFavorite ? literals.btn_remove_favorite[storeLanguages.getActiveLanguage.value] : literals.btn_add_favorite[storeLanguages.getActiveLanguage.value]
            }}
        </button>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 20px 50px;
    border-radius: 30px;
    background: linear-gradient(317.63deg, #353589 -7.42%, #9a9aff 120.45%);

    &-icon {
        width: 100%;
        max-width: 150px;
        margin: 10px auto;
    }

    &-temperature {
        font-size: 36px;
        font-weight: 500;
        color: $white;
        margin-bottom: 20px;
    }

    &-city,
    &-week,
    &-time {
        font-size: 24px;
        color: $white;
        @media only screen and (max-width: $mobile) {
            font-size: 20px;
        }
        @media only screen and (max-width: $mobile-s) {
            font-size: 16px;
        }
    }

    &-time {
        margin-bottom: 20px;
    }

    &-number {
        color: $white;
        font-size: 20px;
    }

    &-info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px 30px;
        border-bottom: 2px solid $white;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    &-text {
        padding-bottom: 10px;
    }

    &-btn {
        width: 100%;
        margin-top: auto;
    }
}
</style>
