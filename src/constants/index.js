export const API_URL = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const weekName = {
    ua: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'п\'ятниця', 'Субота'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

export const getWeekName = (lang = 'en') => weekName[lang];

export const languages = [
    {
        name: "EN",
        value: "en"
    },
    {
        name: "UA",
        value: "ua"
    }
];

export const literals = {
    nav_home: {
        en: "Home",
        ua: "Головна"
    },
    nav_favorite: {
        en: "Favorite",
        ua: "Улюблені"
    },
    tab_day: {
        en: "Day",
        ua: "День"
    },
    tab_weekly: {
        en: "Weekly",
        ua: "Тиждень"
    },
    btn_remove_favorite: {
        en: "Remove from favorite",
        ua: "Видалити з улюблених"
    },
    btn_add_favorite: {
        en: "Add to favorite",
        ua: "Додати до улюблених"
    },
    btn_full_favorite: {
        en: "Favorites are full, delete the city!",
        ua: "Улюблені заповленоб видаліть місто!"
    },
    input_search_not_find: {
        en: "City is not find!",
        ua: "Місто не знайдено!"
    },
    card_add: {
        en: "Add a new card",
        ua: "Додати нову картку"
    },
    card_remove: {
        en: "Remove the card",
        ua: "Видалити карту"
    },
    card_full: {
        en: "Maximum number of cards created, delete card!",
        ua: "Максимально створено карток, видаліть картку!"
    },
    search_placeholder: {
        en: "Enter the name of the city",
        ua: "Ведіть назву міста"
    }
}