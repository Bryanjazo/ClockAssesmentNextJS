import React from "react";
import style from "../styles/timer.module.scss";

export default function Timer({ timer, active, paused }) {
  let hour = ("0" + Math.floor((timer / 60000) % 60)).slice(-2);
  let minutes = ("0" + Math.floor((timer / 1000) % 60)).slice(-2);
  let millSec = ("0" + ((timer / 10) % 100)).slice(-2);

  return (
    <div>
      <div className={style.timer}>
        <span className={style.number}>{hour}:</span>
        <span className={style.number}>{minutes}:</span>
        <span className={style.mili_sec}>{millSec}</span>
      </div>
    </div>
  );
}
