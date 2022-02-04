import React, { useRef, useState } from "react";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [reaminingTime, setReaminingTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = padTime(Math.floor(reaminingTime / 60));
  const seconds = padTime(reaminingTime - minutes * 60);
  let intervalRef = useRef(null);

  function timerStart() {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setReaminingTime((reaminingTime) => {
        if (reaminingTime > 0) return reaminingTime - 1;
        timerReset();
        return 0;
      });
    }, 1000);
    setIsRunning(true);
  }
  function timerStop() {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }
  function timerReset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setReaminingTime(25 * 60);
    setIsRunning(false);
  }
  return (
    <div className="min-h-screen bg-green-400 py-48 px-14 flex justify-evenly items-center">
      <div className="relative flex text-6xl justify-center">
        <strong className="absolute text-purple-500 text-9xl top-0 left-0 transform -translate-x-14 -translate-y-10">
          "
        </strong>
        <span className="text-green-800">{minutes}</span>
        <span className="font-bold text-green-100 animate-pulse">:</span>
        <span className="text-green-800">{seconds}</span>
      </div>
      <div className="flex flex-col space-y-5">
        {!isRunning && (
          <button
            onClick={timerStart}
            className="px-5 py-2 bg-blue-700 hover:bg-blue-500 text-blue-200 hover:text-blue-100 rounded hover:shadow transition duration-300"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={timerStop}
            className="px-5 py-2 bg-yellow-700 hover:bg-yellow-500 text-yellow-200 hover:text-yellow-100 rounded hover:shadow transition duration-300"
          >
            Stop
          </button>
        )}
        <button
          onClick={timerReset}
          className="px-5 py-2 bg-red-700 hover:bg-red-500 text-red-200 hover:text-red-100 rounded hover:shadow transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
