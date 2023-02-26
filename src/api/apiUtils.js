import {getWeekName} from "@/constants";

export const mapWeather = (data, lang = "en") => {
    if (!data) return;
    const list = data.list.map((item) => {
        const date = new Date(item.dt * 1000);
        const day = getWeekName(lang)[date.getDay()];
        const number = date.getDate();
        const month = date.toLocaleString(lang, { month: 'long' });
        const hours = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        return {
            temp: Math.round(item.main.temp),
            tempMin: Math.round(item.main.temp_max),
            tempMax: Math.round(item.main.temp_min),
            dateFormatDay: day,
            dateFormatHours: hours,
            dateFormat: `${number} ${month}`,
            description: item?.weather?.[0]?.description,
            icon: `http://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}@4x.png`
        }
    });
    return {
        id: data?.city?.id,
        name: data?.city?.name,
        coordinates: {
            lon: data?.city?.coord?.lon,
            lat: data?.city?.coord?.lat
        },
        list
    }
};

export const mapCity = (data) => {
    if (!Array.isArray(data)) return;
    return data.map((item) => ({
        name: item.name,
        coordinates: {
            lon: item?.coord?.lon,
            lat: item?.coord?.lat
        }
    }))
};