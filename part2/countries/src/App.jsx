import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

import Filter from './components/Filter'
import CountryInfo from './components/CountryInfo'
import Countries from './components/Countries'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [matchCountry, setMatch] = useState(null) // one country
  const [msg, setMsg] = useState(null)
  const [weatherInfo, setWeather] = useState(null)

  useEffect(() => {
    // console.log(search)
    if (search.length !== 0) {
      countryService
        .getAll()
        .then(filterCountry => {
          const matchedCountries = filterCountry.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
          if (matchedCountries.length > 10) {
            setMsg('Too many matches, specify another filter')
            setCountries([])
            setMatch(null)
            setWeather(null)
          } else if (matchedCountries.length === 1) {
            setCountries([]);
            handleMatch(matchedCountries[0]);
            setMsg(null)
          } else {
            setCountries(matchedCountries);
            setMatch(null);
            setMsg(null)
            setWeather(null)
          }
        })
        .catch(error => {
          console.error(error) // error handling 
        })
    } else {
      setCountries([])
      setMsg(null)
      setMatch(null)
      setWeather(null)
    }
  }, [search])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleWeather = (capital) => {
    weatherService
      .get(capital)
      .then(data => {
        setWeather({ name: data.name, temp: data.main.temp, wind: data.wind.speed, icon: data.weather[0].icon })
      })
      .catch(error => {
        console.log('404 might be capital name has special characters which failed api get')
        setWeather(null)
        // console.error(error);
      })
  }

  const handleMatch = (country) => {
    const { capital, area, languages, flags } = country
    setMatch({ name: country.name.common, capital, area, languages, flags })
    handleWeather(capital)
  }

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries country={countries} msg={msg} handleMatch={handleMatch} />
      <CountryInfo country={matchCountry} weather={weatherInfo} />
      {/* has to be here or it wouldn't be rendered */}
      <Weather weatherInfo={weatherInfo} /> 
    </div>
  )
}

export default App