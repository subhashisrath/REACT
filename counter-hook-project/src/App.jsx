import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
//'counter' is a variable and 'setCounter' is a funtion and 
//'setCounter' is responsible for updating the 'counter'
  let [counter,setCounter] = useState(15)

  const addValue = () => {
    setCounter(prev => {
      if (prev >= 20) return prev;
      console.log("Value added", prev + 1);
      return prev + 1;
    });
  };

  const removeValue = () => {
    setCounter(prev => {
      if (prev <= 0) return prev;
      console.log("Value removed", prev - 1);
      return prev - 1;
    });
  };

  return (
    <>
      <h1>Counter Hook Project</h1>
      <h2>Counter value : {counter}</h2>

      <button onClick = {addValue}>Add Value: {counter}</button>
      <br />
      <br />
      <button onClick = {removeValue}>Remove Value: {counter}</button>
      <p>footer : {counter}</p>
    </>
  )
}

export default App
