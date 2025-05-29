import React from "react";

export default function Timer({ username, virtualTime, startTime }) {
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
