import { defineStore } from 'pinia';

const FAVORITE_CARDS = "favoriteCards";

const onToggleSaveData = (data) => {
    localStorage.removeItem(FAVORITE_CARDS);
    localStorage.setItem(FAVORITE_CARDS, JSON.stringify(data));
}

export const useFavoriteCards = defineStore(FAVORITE_CARDS, {
    state: () => {
        return {
            favoriteCards: []
        }
    },
    getters: {
        getFavoriteCards: (state) => state.favoriteCards
    },
    actions: {
        setFavoriteCards(data) {
            this.favoriteCards = data
        },
        addFavoriteCard(item) {
            this.favoriteCards = [item, ...this.favoriteCards];
            onToggleSaveData(this.favoriteCards);
        },
        removeFavoriteCard(card) {
            this.favoriteCards = this.favoriteCards.filter(item => item.id !== card.id);
            onToggleSaveData(this.favoriteCards);
        }
    },
})