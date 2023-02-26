import { defineStore } from 'pinia';
import {languages} from "@/constants/index.js";

export const useLanguages = defineStore("languages", {
    state: () => {
        return {
            data: languages,
            activeLanguage: languages[0]
        }
    },
    getters: {
        getData: (state) => state.data,
        getActiveLanguage: (state) => state.activeLanguage
    },
    actions: {
        setActiveLanguage(item) {
            this.activeLanguage = item;
        }
    },
})