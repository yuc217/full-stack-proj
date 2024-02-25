import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text = "give feedback"/>
      {/*<button onClick={handleGoodClick}>good</button>*/}
      <Button handleClick={handleGoodClick} text='good' />
      {/*<button onClick={handleNeutralClick}>neutral</button>*/}
      <Button handleClick={handleNeutralClick} text='neutral' />
      {/*<button onClick={handleBadClick}>bad</button>*/}
      <Button handleClick={handleBadClick} text='bad' />
      <Header text = "statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text,value}) => {
  return(
    // <div> {text} {value} {text === 'positive' ? '%' : ''} </div>
    <tr>
      <td> {text} </td>
      <td> {value} {text === 'positive' ? '%' : ''} </td>
    </tr>
    )
  }

const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad

  if(total==0){
    return(
      <div> No feedback given</div>
      )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="average" value ={(total/3).toFixed(1)} />
        <StatisticLine text="positive" value ={(good/total*100).toFixed(1)} />
{/*      <div> good {good} </div>
      <div> neutral {neutral} </div>
      <div> bad {bad} </div>
      <div> all {total} </div>
      <div> average {total/3} </div>
      <div> positive {good/total*100} % </div>*/}
      </tbody>
    </table>
    )
}

const Header = (props) => {
  return (
    <div> 
      <h1>{props.text}</h1>
    </div>
  )
}
