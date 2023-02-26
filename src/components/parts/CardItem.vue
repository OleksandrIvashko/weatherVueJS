<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="card-item">
        <div class="card-item-name">
            {{ props.data?.name }}
        </div>
        <div class="card-item-icon">
            <img :src="props.data.icon" alt="#">
        </div>
        <div class="card-item-temperature">
            {{ props.data?.temp }}&#xb0;<br>
            {{ props.data?.description }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-item {
    width: 125px;
    min-width: 125px;
    scroll-snap-align: start;
    padding: 10px;
    border: 1px solid $black;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &-name {
        text-align: center;
        font-size: 20px;
        @media only screen and (max-width: $mobile) {
            font-size: 14px;
        }
    }

    &-temperature {
        text-align: center;
    }

    &-icon {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>
