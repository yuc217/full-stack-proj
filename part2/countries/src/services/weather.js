import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const get = (capital) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    // const normalizedCity = normalize(city, 'NFD').replace(/[\u0300-\u036f]/g, '');
    // const cityname = encodeURIComponent(normalizedCity)
    console.log(`${baseUrl}${capital}&appid=${api_key}&units=metric`)
    const request = axios.get(`${baseUrl}${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { get } 