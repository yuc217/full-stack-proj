const CountryInfo = ({ country, weatherInfo }) => {
    if (!country) {
        return
    }
    // console.log(weatherInfo)
    return (
        <div>
            <h1> {country.name} </h1>
            capital {country.capital.map((c, index) => (
                <span key={index}>{c}</span>
            ))}
            <div>area {country.area}</div>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.keys(country.languages).map((key, index) => (
                    <li key={index}>{country.languages[key]}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="flag image" />

        </div>

    )
}
export default CountryInfo