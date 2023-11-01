import "./RoundDisplay.css";

const RoundDisplay = ({ timerType, currentRound, rounds }) => {
  return (
    <div className="round-display-container">
      {timerType ? (
        <div>
          <span className="text-p">Timer type:</span> <br />{" "}
          <div className="text-p-large">{timerType}</div>
        </div>
      ) : null}

      <div className="round-display">
        <div>
          <span className="text-p">Current Round:</span> <br />{" "}
          <div className="text-p-large">{currentRound}</div>
        </div>
        <div>
          <span className="text-p">Total Rounds: </span>
          <br /> <div className="text-p-large">{rounds}</div>
        </div>
      </div>
    </div>
  );
};

export default RoundDisplay;
