<script setup>
import { ref, watch } from "vue";
import Spinner from "@/components/ui/Spinner.vue";
import {useLanguages} from "@/composables/useLanguages.js";
import {literals} from "@/constants";

const emits = defineEmits(["update:modelValue", "clickAutocomplete"])
const props = defineProps({
    modelValue: {
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
    }
});
const isShowAutocomplete = ref(false);
const storeLanguages = useLanguages();

watch(() => props.modelValue, (newValue) => {
    isShowAutocomplete.value = newValue.length > 2;
});

const onSelectedItem = (item) => {
    isShowAutocomplete.value = false;
    emits('clickAutocomplete', {
        lat: item.coordinates.lat,
        lon: item.coordinates.lon
    })
};

</script>

<template>
    <div class="input-search">
        <input
            class="input-search-control"
            type="text"
            :placeholder=literals.search_placeholder[storeLanguages.getActiveLanguage.value]
            :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <div
            v-if="isShowAutocomplete"
            class="input-search-autocomplete"
        >
            <div class="input-search-autocomplete-spinner" v-if="isLoadingSearch">
                <Spinner />
            </div>
            <template v-else-if="props.dataAutocomplete?.length">
                <div
                    v-for="(item, index) in props.dataAutocomplete"
                    :key="index"
                    class="input-search-autocomplete-item"
                    @click="onSelectedItem(item)"
                >
                    {{ item.name }}
                </div>
            </template>
            <div class="input-search-autocomplete-empty" v-else>
                {{
                    literals.input_search_not_find[storeLanguages.getActiveLanguage.value]
                }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.input-search {
    position: relative;

    &-autocomplete {
        border-radius: 20px;
        position: absolute;
        margin-top: 5px;
        overflow: hidden;
        background-color: rgb(243 244 246);
        width: 100%;
        left: 0;
        top: 100%;
        font-size: 18px;
        font-weight: 500;

        &-empty {
            color: #ccc;
            text-align: center;
            padding: 5px 10px 5px 25px;
        }

        &-spinner {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-item {
            padding: 5px 10px 5px 25px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                background: #353589;
                color: $white;
            }
        }
    }
}
</style>
