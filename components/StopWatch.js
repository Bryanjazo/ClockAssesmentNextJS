import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import style from "../styles/stopWatch.module.scss";
import ControlButtons from "./ControlButtons";
import Alltimes from "./Times/Alltimes";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getTimes, addTime, cleatTimes } from "../store/times/timeSlice";

export default function StopWatch({ time }) {
  const [Active, setActive] = useState(false);
  const [Paused, setPaused] = useState(true);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let interval = null;
    if (Active && Paused === false) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [Active, Paused, dispatch]);

  const handleAddTime = () => {
    let hour = ("0" + Math.floor((timer / 60000) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timer / 1000) % 60)).slice(-2);
    let millSec = ("0" + ((timer / 10) % 100)).slice(-2);

    fetch(`http://localhost:5000/api/v1/clocks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        time: `${hour}:${minutes}:${millSec}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTime(data));
        console.log(data);
      });
  };
  const handleStart = () => {
    setActive(true);
    setPaused(false);
  };

  const handlePauseOrResume = () => {
    setPaused(!Paused);
  };

  const handleReset = () => {
    setActive(false);
    setTimer(0);
  };

  return (
    <div className={style.stopWatchContainer}>
      <Timer timer={timer} active={Active} paused={Paused} />
      <ControlButtons
        active={Active}
        paused={Paused}
        handleAddTime={handleAddTime}
        handleStart={handleStart}
        handlePauseOrResume={handlePauseOrResume}
        handleReset={handleReset}
      />
      <Alltimes />
    </div>
  );
}
