
const Countries = ({ country, msg, handleMatch }) => {
    if (msg) {
        return (
            <div> {msg} </div>
        )
    }
    if (country.length === 0) {
        return
    }

    return (
        <div>
            {country.map(c =>
                <div key={c.ccn3}>
                    <> {c.name.common} </>
                    <button onClick={() => handleMatch(c)}>show</button>
                </div>

            )}
        </div>

    )
}
export default Countries