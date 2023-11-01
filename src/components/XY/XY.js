// fix the bug where round increases by 2.
// User input field for the number of rounds.

import { useEffect, useRef, useState } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import SplitButton from "../SplitButton/SplitButton";

import TimeInput from "../TimeInput/TimeInput";
import RoundInput from "../RoundInput/RoundInput";
import RoundDisplay from "../RoundDisplay/RoundDisplay";

export default function XY({ inputTime, rounds }) {
  const [remainingTime, setRemainingTime] = useState(inputTime);
  const [currentRound, setCurrentRound] = useState(1);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);

  const startTimer = () => {
    if (!intervalId.current && (currentRound !== rounds || remainingTime > 0)) {
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
    setCurrentRound(1);
  };

  const split = () => {
    setCurrentRound((currentRound) => {
      if (currentRound < rounds) {
        setRemainingTime(inputTime);
        return currentRound + 1;
      } else {
        fastForwardTimer();
        return currentRound;
      }
    });
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setRemainingTime(0);
      stopTimer();
      setCurrentRound(rounds);
    }
  };

  const handleTimeDecrease = () => {
    setRemainingTime((remainingTime) => remainingTime - 1);
  };

  useEffect(() => {
    if (remainingTime + 1 === 0) {
      split();
    }
  }, [remainingTime]);

  useEffect(() => {
    resetTimer();
  }, [inputTime, rounds]);

  return (
    <div className="XY">
      <TimeDisplay time={remainingTime} />

      <RoundDisplay currentRound={currentRound} rounds={rounds} />
      <div className="button-collection">
        <PlayPauseButton
          onPause={stopTimer}
          onPlay={startTimer}
          running={running}
        ></PlayPauseButton>
        <ResetButton onClick={resetTimer}>Reset</ResetButton>
        <SplitButton onClick={split}></SplitButton>
        <FastForwardButton onClick={fastForwardTimer}>
          Fast Forward
        </FastForwardButton>
      </div>
    </div>
  );
}

export const XYWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="timer-container">
      <h3 className="text-h3">XY</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
        <RoundInput setRounds={setRounds} rounds={rounds} />
      </div>
      <XY inputTime={inputTime} rounds={rounds} />
    </div>
  );
};
