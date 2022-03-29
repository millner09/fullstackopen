import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Feedback = ({ incrementGood, incremenetNeutral, incrementBad }) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={incrementGood} />
      <Button text="neutral" onClick={incremenetNeutral} />
      <Button text="bad" onClick={incrementBad} />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  const score = good * 1 + bad * -1;

  if (sum === 0)
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={score / sum} />
          <StatisticLine tate text="positive" value={good / sum} />
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incremenetNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Feedback
        incrementGood={incrementGood}
        incremenetNeutral={incremenetNeutral}
        incrementBad={incrementBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
