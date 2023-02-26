<script setup>
import {ref} from "vue";
import Modal from "@/components/ui/Modal.vue";
import CardSection from "@/components/CardSection.vue";
import {useLanguages} from "@/composables/useLanguages.js";
import {literals} from "@/constants";

const visibleModal = ref(false);
const cardsSection = ref([{
    id: new Date().getTime()
}]);
const storeLanguages = useLanguages();

const showModal = () => {
    visibleModal.value = true
};

const closeModal = () => {
    visibleModal.value = false
};

const addCard = () => {
    if (cardsSection.value.length >= 5) {
        showModal();
        return;
    }
    cardsSection.value.push({
        id: new Date().toString()
    })
};

const removeCard = (card) => {
    cardsSection.value = cardsSection.value.filter((item) => item.id !== card.id);
};
</script>

<template>
    <div class="cards-list">
        <div class="wr">
            <div class="cards-list-content">
                <div
                    v-for="(item, index) in cardsSection"
                    :key="item.id"
                    class="cards-list-item"
                >
                    <CardSection/>
                    <button
                        v-if="index < cardsSection.length - 1 || index === 4"
                        class="cards-list-btn"
                        @click.prevent="removeCard(item)"
                    >
                        {{
                            literals.card_remove[storeLanguages.getActiveLanguage.value]
                        }}
                    </button>
                </div>
                <button
                    class="cards-list-btn"
                    @click.prevent="addCard()"
                >
                    {{
                        literals.card_add[storeLanguages.getActiveLanguage.value]
                    }}
                </button>
                <Modal v-model:show="visibleModal">
                    <div class="cards-list-text">
                        {{
                            literals.card_full[storeLanguages.getActiveLanguage.value]
                        }}
                    </div>
                    <div class="cards-list-add-btn">
                        <button @click="closeModal">Ok</button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cards-list {
    &-content {
        padding: 20px 15px;
        border: 2px solid $black;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
    }

    &-item {
        margin-bottom: 20px;
        border-bottom: 2px solid $black;

        &:last-child {
            padding-bottom: 0;
            margin-bottom: 0;
            border-bottom: 0;
        }
    }

    &-text {
        padding-bottom: 10px;
    }

    &-btn {
        width: 100%;
    }

    &-add-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
}
</style>
