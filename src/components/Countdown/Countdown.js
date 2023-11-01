import { useEffect, useRef, useState } from "react";

import TimeDisplay from "../TimeDisplay/TimeDisplay";
import TimeInput from "../TimeInput/TimeInput";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";

export default function Countdown({ inputTime }) {
  const [remainingTime, setRemainingTime] = useState(inputTime);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);

  const startTimer = () => {
    if (!intervalId.current && remainingTime > 0) {
      intervalId.current = setInterval(handleTimeDecrease, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setRunning(false);
    }
  };

  const resetTimer = () => {
    setRemainingTime(inputTime);
    stopTimer();
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setRemainingTime(0);
      stopTimer();
    }
  };

  useEffect(() => {
    resetTimer();
  }, [inputTime]);

  const handleTimeDecrease = () => {
    setRemainingTime((remainingTime) => {
      if (remainingTime > 0) {
        return remainingTime - 1;
      } else {
        stopTimer();
        return remainingTime;
      }
    });
  };

  return (
    <div className="Countdown">
      <TimeDisplay time={remainingTime} />

      <div className="button-collection">
        <PlayPauseButton
          onPause={stopTimer}
          onPlay={startTimer}
          running={running}
        ></PlayPauseButton>
        <ResetButton onClick={resetTimer}>Reset</ResetButton>
        <FastForwardButton onClick={fastForwardTimer}>
          Fast Forward
        </FastForwardButton>
      </div>
    </div>
  );
}

export const CountdownWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);

  return (
    <div className="timer-container">
      <h3 className="text-h3">Countdown</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
      </div>
      <Countdown inputTime={inputTime} />
    </div>
  );
};
