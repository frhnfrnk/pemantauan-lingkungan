const API_WEATHER = 'https://api.weatherapi.com/v1';

export function fetchTemperature(city: string, apiKey: string) {
    return fetch(`${API_WEATHER}/current.json?key=${apiKey}&q=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.current.temp_c) 
    .catch(error => console.error('Error fetching temperature data:', error));
}

export function fetchHumidity(city: string, apiKey: string) {
    return fetch(`${API_WEATHER}/current.json?key=${apiKey}&q=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.current.humidity) // Assuming the humidity is in `current.humidity`
    .catch(error => console.error('Error fetching humidity data:', error));
}
