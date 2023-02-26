import axios from "axios";
import {API_URL, API_KEY} from "@/constants";
import {mapCity, mapWeather} from "@/api/apiUtils";

const instance = axios.create({
    baseURL: API_URL,
    params: {
        appid: API_KEY
    }
});

export const getContentWeather = async ({ lat, lon, lang } = {}) => {
    if (!lat && !lon) return;
    const _lang = lang || "en";
    try {
        const res =  await instance.get(`/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${_lang}`);
        return mapWeather(res?.data, lang);
    } catch (error) {
        console.warn(error, "-> getContentWeather");
        throw new Error(error);
    }
}

export const getCityByName = async (name, lang = 'en') => {
    if (!name) return [];
    try {
        const res =  await instance.get(`/find?q=${name}&limit=10&lang=${lang}&appid=${API_KEY}`);
        return mapCity(res?.data?.list);
    } catch (error) {
        console.warn(error, "-> getCityByName");
        throw new Error(error);
    }
}
