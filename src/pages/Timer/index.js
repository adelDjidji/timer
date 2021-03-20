// Globals
import "./styles.scss";
import React,{ useCallback,useState } from "react";

// Components
import { Button } from "components/Button";

// Sub-component
function Expired() {
  return (
    <div className="aura-expired">
      <div className="aura-expired-emoji">⚠️</div>
      <div className="aura-expired-text">Timer expired!</div>
    </div>
  );
}

// Component
function Timer() {
  // Hooks - state
  const [counter,setCounter] = useState(0);
  const [isCounting,setisCounting] = useState(false);


  setTimeout(() => {
    if (isCounting && counter > 0) {
      setCounter(counter - 1)
    }
    if(!isCounting && counter>0 && counter<60){
      setCounter(60)
    }
    console.log("ss");
    console.log("isCounting", isCounting);
    console.log("counter", counter);
  },1000);

  const handleStart = () => {
    setCounter(60)
    setisCounting(true)
  }

  const handleReset = () => {
    if (isCounting) {
      setisCounting(false)
      setCounter(60)
    }

    // setInterval(() => {
    //   if(isCounting){
    //     setisCounting(false)
    //   setCounter(60)
    //   }
    //   console.log("interval");
    // },1000);
  }

  // Render
  return (
    <div className="aura-page aura-timer">
      <h1>Timer</h1>

      <div className="aura-page-content">
        <div className="aura-timer-clock">{
          counter === 60 ?
            "1:00" :
            `0:${counter < 10 ? '0' + counter : counter
            }`}</div>
        {counter <= 0 ? <Expired /> : null}

        <div className="aura-timer-buttons">
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

export { Timer };
