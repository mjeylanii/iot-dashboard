export async function fetchWeatherData(key: string) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${key}`,
    );
    return response.json();
    }

// Path: src\lib\server\fetch_weather.test.ts