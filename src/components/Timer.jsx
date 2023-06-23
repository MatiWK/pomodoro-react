import React, { useEffect, useState } from 'react'
import sound from "../assets/sound.mp3"

const Timer = (props) => {
    
    const [time, setTime] = useState({
      minutes: 25,
      seconds: 0
    })
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [chosenTimer, setChosenTimer] = useState({
      pomodoro: true,
      shortbreak: false,
      longbreak: false
    });

    const colorLinks = {
      pomodoro: "pomodoro",
      break: "break"
    }
    
    function play(){
      new Audio(sound).play()
      setIsDone(false)
    }

    
    // DECONSTRUCTION TO MAKE IT MORE APPEALING TO AN EYE
    const {pomodoro, shortbreak, longbreak} = chosenTimer;
    const {minutes, seconds} = time;

    
    const inactiveButton = "mx-3"
    const activeButton = inactiveButton + " transparent-background px-2 py-1 rounded-lg";

    // POSSIBLE COUNTDOWN LENGTHS
    const longbreakLength = 10;
    const shortbreakLength = 5;
    const pomodoroLength = 25;

  
    // COUNTDOWN LOGIC
    let interval;

    useEffect(() => {

      if(isRunning){

        interval = setInterval(() => {
          
          if(seconds === 0 && minutes === 0){
            setIsRunning(false)
            setIsDone(true)
            setTime(() => {
              return {
                minutes: 25,
                seconds: 0,
              }
            })

          } else if (seconds === 0){
            setTime({
              minutes: minutes - 1,
              seconds: 59
            })
          } else{
            setTime((prev) => {
              return {
                ...prev,
                seconds: seconds - 1
              }
            })
          }
          
        }, 1000)
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [seconds, minutes, interval, isRunning]);
    
    function startStop(){
      setIsRunning((prev) => !prev);
      setIsDone(false);

    }

    // RESTARTING TIMER
    function restart(){
      if(pomodoro){
        setTime({
          minutes: shortbreakLength,
          seconds: 0
        })
        setChosenTimer({
          pomodoro: false,
          shortbreak: true,
          longbreak: false
        })
        props.backgroundChange(colorLinks.break)

      } else if (shortbreak){
        setTime({
          minutes: pomodoroLength,
          seconds: 0
        })
        setChosenTimer({
          pomodoro: true,
          shortbreak: false,
          longbreak: false
        })
        props.backgroundChange(colorLinks.pomodoro)
      } else {
        setTime({
          minutes: pomodoroLength,
          seconds: 0
        })
        setChosenTimer({
          pomodoro: true,
          shortbreak: false,
          longbreak: false
        })
        props.backgroundChange(colorLinks.pomodoro)
      }
      setIsRunning(false);
    }


    // CHOOSING COUNTDOWN LOGIC
    function handlePomodoro(e) {
      // prevents page from reloading
      e.preventDefault();
      // choses link to apply styling to
      setChosenTimer(() => {
        return {
          pomodoro: true,
          shortbreak: false,
          longbreak: false
        }
      })
      // sets time according to the selected one
      setTime({
        minutes: pomodoroLength,
        seconds: 0
      })
      setIsRunning(false);

      // sends chosen link to app.jsx
      props.backgroundChange(colorLinks.pomodoro)

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
      setTime({
        minutes: shortbreakLength,
        seconds: 0
      })
      setIsRunning(false);
      
      props.backgroundChange(colorLinks.break)

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
      setTime({
        minutes: longbreakLength,
        seconds: 0
      })
      setIsRunning(false);
      
      props.backgroundChange(colorLinks.break)

    }

  return (
    <div>
    

    {/* MODES */}
      <div className=' my-3 py-3'>
            <a href="/pomodoro"  className={pomodoro ? activeButton : inactiveButton} onClick={handlePomodoro} >Pomodoro</a>
            <a href="/shortbreak"  className={shortbreak ? activeButton : inactiveButton} onClick={handleShortbreak}>Short Break</a>
            <a href="/longbreak"  className={longbreak ? activeButton : inactiveButton} onClick={handleLongBreak}>Long Break</a>
      </div>

      {/* COUNTDOWN */}
      <h1 className='text-9xl'>
        {minutes}:{String(seconds).padStart(2, '0')}
       </h1>
       <div style={{fontSize: "50px"}}>
        <button className='mx-3'  onClick={startStop}>{isRunning ? "Stop": "Start"}</button>
          {isRunning && <button className='mx-3' onClick={restart} style={{color: "white"}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
          </svg>
        </button>}
        <h1 className='text-9 xl'>{isDone && play()}</h1>
       </div>
        
    </div>
  )
}

export default Timer
