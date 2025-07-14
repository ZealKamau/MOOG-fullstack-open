import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad; // Total number of feedback

  if (total === 0) {
    return <p>No feedback given yet.</p>;
  } // If no feedback is given, return this message

  const positivePercentage = (good / total) * 100 || 0; // Positive feedback percentage
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positivePercentage.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
