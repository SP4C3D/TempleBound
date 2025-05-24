import React, { useEffect, useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalMinutes = count;
    const newDay = Math.floor(totalMinutes / 1440) + 1;
    const newHour = Math.floor((totalMinutes % 1440) / 60);
    const newMinute = totalMinutes % 60;

    setDay(newDay);
    setHour(newHour);
    setMinute(newMinute);
  }, [count]);

  return (
    <div className="timer">
      Day {day} | {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
    </div>
  );
}