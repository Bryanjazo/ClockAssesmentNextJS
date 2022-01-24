import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import StopWatch from "../components/StopWatch";
import { useDispatch, useSelector } from "react-redux";
import { getTimes } from "../store/times/timeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { timeItems, addedItems } = useSelector((state) => state.time);

  useEffect(() => {
    if (timeItems.length === 0) {
      dispatch(getTimes());
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <StopWatch />
    </div>
  );
}
