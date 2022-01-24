import React from "react";
import style from "../styles/stopWatch.module.scss";
export default function ControlButtons({
  paused,
  handlePauseOrResume,
  handleReset,
  handleStart,
  active,
  handleTime,
  handleAddTime,
}) {
  const startButton = (
    <div className={style.btn1} onClick={handleStart}>
      Start
    </div>
  );
  const pauseaButton = (
    <div className={style.btn_grp}>
      <div className={style.btn2} onClick={handleReset}>
        Reset
      </div>
      <div className={style.btn1} onClick={handlePauseOrResume}>
        {paused ? "Resume" : "Pause"}
      </div>
      <div className={style.btn1} onClick={handleAddTime}>
        Add Time
      </div>
    </div>
  );

  return (
    <div className={style.Control_Buttons}>
      <div>{active ? pauseaButton : startButton}</div>
    </div>
  );
}
