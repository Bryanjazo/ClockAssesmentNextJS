import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "../../../styles/stopWatch.module.scss";
import cont from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  cleatTime,
  addSingleTime,
  navigateHome,
} from "../../../store/times/timeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Time({ time }) {
  const { oneTime } = useSelector((state) => state.time);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setEdit] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [Milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    dispatch(addSingleTime(time.data.time));
  }, [time.data.time]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!isEdit);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteing = await fetch(
      `http://localhost:5000/api/v1/clocks/${time.data._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(cleatTime(data));
      });
    const routing = await router.push("/");
  };

  const handleHome = async (e) => {
    e.preventDefault();
    const clear = await dispatch(navigateHome());
    const routing = await router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEdit(!isEdit);

    if (minute > 59) {
      alert("Invalid number... minute cant go higher than 59");
    }
    if (Milliseconds > 99) {
      alert("Invalid number... Milliseconds cant go higher than 99");
    }

    const update = await fetch(
      `http://localhost:5000/api/v1/clocks/${time.data._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          time: `${hour}:${minute}:${Milliseconds}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(addSingleTime(data.data.time));
      });
  };

  if (isEdit) {
    return (
      <form onSubmit={handleSubmit}>
        <div className={cont.container}>
          <label>Hour</label>
          <input
            className={style.input1}
            type="number"
            value={hour}
            min="0"
            placeholder="Hour"
            onChange={(e) => setHour(e.target.value)}
          />

          <label>Minutes</label>
          <input
            className={style.input1}
            type="number"
            max="59"
            min="0"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="Minutes"
          />

          <label>Milliseconds</label>
          <input
            className={style.input1}
            type="number"
            max="99"
            min="0"
            value={Milliseconds}
            onChange={(e) => setMilliseconds(e.target.value)}
            placeholder="Milliseconds"
          />

          <div className={style.btn_grp_time}>
            <button className={style.btn1} onClick={handleSubmit}>
              Submit
            </button>
            <button className={style.btn2} onClick={(e) => setEdit(!isEdit)}>
              Back
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div className={cont.container}>
        <h1>{oneTime}</h1>
        <div className={style.btn_grp_time}>
          <button className={style.btn1} onClick={handleHome}>
            Home
          </button>

          <button className={style.btn2} onClick={handleEdit}>
            Edit
          </button>

          <button className={style.btn1} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/clocks/${context.params.id}`
  );
  const time = await res.json();

  return {
    props: {
      time,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/clocks`);
  const times = await res.json();

  const ids = times.data.map((t) => t._id);

  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
