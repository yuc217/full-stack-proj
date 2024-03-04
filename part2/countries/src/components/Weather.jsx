
const Weather = ({ weatherInfo }) => {
    // console.log(weatherInfo)
    if (!weatherInfo) {
        return
    }

    return (
        <div>
            <h2>Weather in {weatherInfo.name} </h2>
            <div>temperature {weatherInfo.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt="flag image" />
            <div>wind {weatherInfo.wind} m/s</div>
        </div>
    )
}
export default Weather  