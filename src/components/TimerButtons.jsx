import React, { useEffect, useState } from 'react'

const TimerButtons = (props) => {
  const [chosenTimer, setChosenTimer] = useState({
    pomodoro: true,
    shortbreak: false,
    longbreak: false
  });

  const longbreakLength = 10;
  const shortbreakLength = 5;
  const pomodoroLength = 25;
  const seconds = 0;
  const inactiveButton = "mx-3"
  const activeButton = inactiveButton + " transparent-background px-2 py-1 rounded-lg";
  const swap = false;

  function handlePomodoro(e) {
    e.preventDefault();
    setChosenTimer(() => {
      return {
        pomodoro: true,
        shortbreak: false,
        longbreak: false
      }
    })

    props.getTime(pomodoroLength, seconds, swap);

  }

  function handleShortbreak(e) {
    e.preventDefault();
    setChosenTimer(() => {
      return {
        pomodoro: false,
        shortbreak: true,
        longbreak: false
      }
    })

    props.getTime(shortbreakLength, seconds, swap);

  }
  
  function handleLongBreak(e) {
    e.preventDefault();
    setChosenTimer(() => {
      return {
        pomodoro: false,
        shortbreak: false,
        longbreak: true
      }
    })

    props.getTime(longbreakLength, seconds, swap);

  }
    
  return (
    <div>
        <div className=' my-3 py-3'>
            <a href="/pomodoro"  
            className={chosenTimer.pomodoro ? activeButton : inactiveButton} onClick={handlePomodoro} >Pomodoro</a>
            <a href="/shortbreak"  className={chosenTimer.shortbreak ? activeButton : inactiveButton} onClick={handleShortbreak}>Short Break</a>
            <a href="/longbreak"  className={chosenTimer.longbreak ? activeButton : inactiveButton} onClick={handleLongBreak}>Long Break</a>
        </div>
        
    </div>

  )
}

export default TimerButtons
