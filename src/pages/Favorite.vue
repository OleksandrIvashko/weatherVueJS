<script setup>
import {onMounted} from "vue";
import {useFavoriteCards} from "@/composables/useFavoriteCards";
import CardSection from "@/components/CardSection.vue";

const store = useFavoriteCards();

onMounted(() => {
    const getLocalData = localStorage.getItem("favoriteCards") ? JSON.parse(localStorage.getItem("favoriteCards")) : null;
    if (Array.isArray(getLocalData)) {
        store.setFavoriteCards(getLocalData);
    }
})
</script>

<template>
    <div class="home">
        <CardSection
            v-for="item in store.getFavoriteCards"
            :key="item.id"
            :coords="item.coordinates"
            :isShowCitySearch="false"
        />
    </div>
</template>

<style scoped lang="scss">

</style>
