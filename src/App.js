import { useEffect, useRef, useState } from "react";
import "./styles.css";

import { CountdownWithUserInput } from "./components/Countdown/Countdown.js";
import { StopWatchWithUserInput } from "./components/StopWatch/StopWatch.js";
import { XYWithUserInput } from "./components/XY/XY";
import { TabataWithUserInput } from "./components/TABATA/TABATA";

export default function App() {
  return (
    <div className="App">
      <CountdownWithUserInput />

      <StopWatchWithUserInput />

      <XYWithUserInput />
      <TabataWithUserInput />
    </div>
  );
}
