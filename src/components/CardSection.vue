<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {getCityByName, getContentWeather} from "@/api";
import Tabs from "@/components/ui/Tabs.vue";
import Tab from "@/components/ui/Tab.vue";
import Schedule from "@/components/Schedule.vue";
import Card from "@/components/parts/Card.vue";
import CardItem from "@/components/parts/CardItem.vue";
import Modal from "@/components/ui/Modal.vue";
import Spinner from "@/components/ui/Spinner.vue";
import {useFavoriteCards} from "@/composables/useFavoriteCards";
import {useLanguages} from "@/composables/useLanguages.js";
import {literals} from "@/constants";

const props = defineProps({
    coords: {
        type: Object,
        default: () => ({})
    },
    isShowCitySearch: {
        type: Boolean,
        default: true
    }
});

const store = useFavoriteCards();
const storeLanguages = useLanguages();
const getActiveLanguageValue = computed(() => storeLanguages.getActiveLanguage.value);
const dataTabs = computed(() => [
    {
        label: literals.tab_day[getActiveLanguageValue.value],
        value: 'day',
    },
    {
        label: literals.tab_weekly[getActiveLanguageValue.value],
        value: 'weekly'
    }
]);
const activeTab = ref(dataTabs.value[0].value);
const searchValue = ref('');
const cardData = ref({});
const dataAutocomplete = ref([]);
const isLoadingSearch = ref(false);
const visibleModal = ref(false);
const isLoading = ref(false);

const onChangeTab = (value) => {
    activeTab.value = value;
};

const getCity = async () => {
    try {
        if (searchValue.value.length > 2) {
            isLoadingSearch.value = true;
            const res = await getCityByName(searchValue.value, getActiveLanguageValue.value);
            dataAutocomplete.value = res;
            isLoadingSearch.value = false;
            return;
        }
        dataAutocomplete.value = [];
        isLoadingSearch.value = false;
    } catch (error) {
        console.warn(error, "-> getCity");
        dataAutocomplete.value = [];
        isLoadingSearch.value = false;
        alert("Something went wrong");
    }
};

const getWeather = async ({lat, lon}) => {
    try {
        isLoading.value = true;
        const res = await getContentWeather({lat, lon, lang: getActiveLanguageValue.value});
        cardData.value = res;
        dataAutocomplete.value = [];
        isLoading.value = false;
    } catch (error) {
        console.warn(error, "-> getWeather")
        alert("Something went wrong");
    } finally {
        isLoading.value = false;
        dataAutocomplete.value = [];
    }
};

const initWeatherByDefault = () => {
    isLoading.value = true;
    if (props.coords?.lat && props.coords?.lon) {
        getWeather({
            lon: props.coords.lon,
            lat: props.coords.lat
        });
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
                getWeather({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            () => {
                getWeather({
                    lat: 50,
                    lon: 50
                });
            });
    } else {
        getWeather({
            lat: 50.4333,
            lon: 30.5167
        });
    }
};

const todayWeather = computed(() => {
    return {
        ...cardData.value,
        isFavorite: Boolean(store.getFavoriteCards.find((item) => item?.id === cardData.value?.id)),
        weather: cardData.value?.list?.[0]
    }
});

const cardsWeather = computed(() => {
    if (activeTab.value === 'weekly') {
        const list = cardData.value?.list?.reduce((result, item) => {
            const existItem = result?.find((resultItem) => resultItem?.dateFormatDay === item?.dateFormatDay);
            if (!existItem) {
                result.push({
                    ...item,
                    name: item.dateFormatDay
                });
                return result;
            }
            return result;
        }, []);
        return list?.slice(0, 5) || [];
    }
    return cardData.value?.list?.slice(0, 8)?.map((item) => ({
        ...item,
        name: item.dateFormatHours
    })) || []
});

const dataSchedule = computed(() => {
    const labels = [];
    const data = [];
    for (let i = 0; i < cardsWeather.value.length; i++) {
        labels.push(cardsWeather.value[i].name)
        data.push(cardsWeather.value[i].temp)
    }
    return {
        labels,
        data
    }
});

const toggleFavorite = () => {
    if (store.getFavoriteCards.length >= 5) {
        visibleModal.value = true;
        return;
    }
    if (todayWeather.value?.isFavorite) {
        store.removeFavoriteCard(cardData.value);
        return;
    }
    store.addFavoriteCard(cardData.value);
};

const closeModal = () => {
    visibleModal.value = false
};

watch(() => getActiveLanguageValue.value, () => {
    getWeather({
        ...cardData.value.coordinates
    })
});

onMounted(() => {
    initWeatherByDefault();
});

watch(() => props.coords, () => {
    initWeatherByDefault();
});

watch(searchValue, () => {
    getCity();
});

</script>

<template>
    <div class="card-section">
        <div class="wr">
            <div class="card-section-content">
                <Card
                    :data="todayWeather"
                    :dataAutocomplete="dataAutocomplete"
                    :isLoadingSearch="isLoadingSearch"
                    :isShowCitySearch="props.isShowCitySearch"
                    @clickAutocomplete="getWeather"
                    @toggleFavorite="toggleFavorite"
                    v-model:search="searchValue"
                />
                <div class="card-section-body">
                    <div v-if="isLoading" class="card-section-spinner">
                        <Spinner />
                    </div>
                    <template v-else>
                        <Tabs
                            :data="dataTabs"
                            :activeTab="activeTab"
                            @click="onChangeTab"
                        >
                            <Tab :active="true">
                                <div class="card-section-cards">
                                    <CardItem
                                        v-for="(item, index) in cardsWeather"
                                        :key="index"
                                        :data="item"
                                    />
                                </div>
                            </Tab>
                        </Tabs>
                        <Schedule
                            :data="dataSchedule.data"
                            :labels="dataSchedule.labels"
                        />
                    </template>
                    <Modal v-model:show="visibleModal">
                        <div class="card-section-text">
                            {{ literals.btn_full_favorite[storeLanguages.getActiveLanguage.value] }}
                        </div>
                        <div class="card-section-add-btn">
                            <button @click="closeModal">Ok</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-section {

    &::v-deep {
        .card {
            width: 35%;
            @media only screen and (max-width: $tablet) {
                width: 100%;
            }
        }
    }

    &-content {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        @media only screen and (max-width: $tablet) {
            flex-direction: column;
        }
    }

    &-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &-body {
        width: 60%;
        padding-left: 20px;
        @media only screen and (max-width: $tablet) {
            width: 100%;
            padding-left: 0;
        }
    }

    &-cards {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        gap: 20px;
        overflow: auto;
        padding-bottom: 15px;
        scroll-snap-type: x mandatory;
    }

    &-text {
        padding-bottom: 10px;
    }

    &-btn {
        margin-top: 10px;
    }

    &-add-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
}
</style>
