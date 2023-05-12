export async function fetchWeatherData(key: string, latitude: string, longitude: string) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`,
    ).then((response) => {
        return response.json();
    }).catch((err) => {
        return err.json();
    });
    return response;

    }

