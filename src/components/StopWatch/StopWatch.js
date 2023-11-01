import { useEffect, useRef, useState } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";

import TimeInput from "../TimeInput/TimeInput";
export default function StopWatch({ maxTime }) {
  const [timePassed, setTimePassed] = useState(0);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);

  const startTimer = () => {
    if (!intervalId.current && timePassed < maxTime) {
      intervalId.current = setInterval(handleTimeIncrease, 1000);
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
    setTimePassed(0);
    stopTimer();
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setTimePassed(maxTime);
      stopTimer();
    }
  };

  const handleTimeIncrease = () => {
    setTimePassed((timePassed) => {
      if (timePassed < maxTime) {
        return timePassed + 1;
      } else {
        stopTimer();
        return timePassed;
      }
    });
  };

  useEffect(() => {
    resetTimer();
  }, [maxTime]);

  return (
    <div className="StopWatch">
      <TimeDisplay time={timePassed} />

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

export const StopWatchWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);

  return (
    <div className="timer-container">
      <h3 className="text-h3">Stop Watch</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
      </div>
      <StopWatch maxTime={inputTime} />
    </div>
  );
};
