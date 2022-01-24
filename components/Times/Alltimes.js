import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "../../styles/timer.module.scss";
import styles from "../../styles/stopWatch.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTimes } from "../../store/times/timeSlice";
export default function Alltimes() {
  const { timeItems, addedItems } = useSelector((state) => state.time);

  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={style.timeContainer}>
      {active ? add : ""}

      <h2>Times:</h2>
      {timeItems.map((time) =>
        time.map((t, key) => (
          <div className={style.allTimes} key={key}>
            <Link href={`/time/[id]`} as={`/time/${t._id}`}>
              <h1 className={style.time}>{t.time}</h1>
            </Link>
          </div>
        ))
      )}
      {addedItems.map((item, key) => (
        <div className={style.allTimes} key={key}>
          <Link href={`/time/[id]`} as={`/time/${item._id}`}>
            <h1 className={style.time}>{item.time}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
