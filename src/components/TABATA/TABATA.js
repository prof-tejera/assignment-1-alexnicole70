import { useEffect, useRef, useState } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import SplitButton from "../SplitButton/SplitButton";

import RoundInput from "../RoundInput/RoundInput";
import TimeInput from "../TimeInput/TimeInput";
import RoundDisplay from "../RoundDisplay/RoundDisplay";

export default function Tabata({ workInterval, restInterval, rounds }) {
  const [remainingTime, setRemainingTime] = useState(workInterval);
  const [currentRound, setCurrentRound] = useState(1);
  const [timerType, setTimerType] = useState("Workout");
  const intervalId = useRef();
  const [running, setRunning] = useState(false);

  const startTimer = () => {
    console.log("startTimer");
    if (
      !intervalId.current &&
      (timerType === "Workout" ||
        (timerType === "Rest" && remainingTime > 0 && currentRound !== rounds))
    ) {
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
    setRemainingTime(workInterval);
    setTimerType("Workout");
    stopTimer();
    setCurrentRound(1);
  };

  const split = () => {
    // console.log(currentRound);
    setCurrentRound((currentRound) => {
      console.log(timerType);

      if (currentRound < rounds && timerType === "Rest") {
        setRemainingTime(workInterval);
        setTimerType("Workout");
        return currentRound + 1;
      } else if (currentRound <= rounds && timerType === "Workout") {
        setRemainingTime(restInterval);
        setTimerType("Rest");
        return currentRound;
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
      setTimerType("Rest");
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
  }, [workInterval, restInterval, rounds]);

  return (
    <div className="Tabata">
      <TimeDisplay time={remainingTime} />
      <RoundDisplay
        currentRound={currentRound}
        rounds={rounds}
        timerType={timerType}
      />
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

export const TabataWithUserInput = () => {
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="timer-container">
      <h3 className="text-h3">TABATA</h3>

      <div className="input-wrapper">
        <TimeInput setInputTime={setWorkTime} timeLabelName={"Workout Time"} />
        <TimeInput setInputTime={setRestTime} timeLabelName={"Rest Time"} />
        <RoundInput setRounds={setRounds} rounds={rounds} />
      </div>
      <Tabata workInterval={workTime} restInterval={restTime} rounds={rounds} />
    </div>
  );
};
