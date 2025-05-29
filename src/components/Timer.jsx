// Timer.jsx
import React, { useEffect, useState } from "react";

export default function Timer({ username }) {
  const [startTime] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(new Date(startTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setVirtualTime((prev) => new Date(prev.getTime() + 60000)); // +1 minute
    }, 1000); // every second
    return () => clearInterval(interval);
  }, []);

  const hour = virtualTime.getHours();
  const minute = virtualTime.getMinutes();
  const day = Math.floor((virtualTime - startTime) / (1000 * 60 * 1440)) + 1;

  let greeting;
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="timer text-center">
      <span>{greeting}, {username}!</span>
      <p>Day {day} | {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}</p>
    </div>
  );
}
