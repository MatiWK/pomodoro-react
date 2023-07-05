import { useEffect, useState } from 'react'
import sound from "../assets/sound.mp3"
import TimerButtons from './TimerButtons';

  // POSSIBLE COUNTDOWN LENGTHS
  const longbreakLength = 10 * 60;
  const shortbreakLength = 5 * 60;
  const pomodoroLength = 25 * 60;

  // MODES
  const modes = {
    pomodoroTimer: {
      initialTime: pomodoroLength,
      label: "Pomodoro",
      chooseTimer: {
        pomodoro: true,
        shortbreak: false,
        longbreak: false
      }
    },
    shortbreakTimer: {
      initialTime: shortbreakLength,
      label: "Short Break",
      chooseTimer: {
        pomodoro: false,
        shortbreak: true,
        longbreak: false
      }
    },
    longbreakTimer: {
      initialTime: longbreakLength,
      label: "Long Break",
      chooseTimer: {
        pomodoro: false,
        shortbreak: false,
        longbreak: true
      }
    }
  }


const Timer = (props) => {
  const {pomodoroTimer, shortbreakTimer, longbreakTimer} = modes;
    
    const [time, setTime] = useState(pomodoroTimer.initialTime)
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [chosenTimer, setChosenTimer] = useState(pomodoroTimer.chooseTimer);

    const colorLinks = {
      pomodoro: pomodoroTimer.label,
      break: "break"
    }
    
    function play(){
      new Audio(sound).play()
      setIsDone(false)
    }

    
    // DECONSTRUCTION TO MAKE IT MORE APPEALING TO AN EYE
    const {pomodoro, shortbreak} = chosenTimer;
    
    const inactiveButton = "mx-3"
    const activeButton = inactiveButton + " transparent-background px-2 py-1 rounded-lg";

    useEffect(() => {

      let interval;

      if(isRunning){

        interval = setInterval(() => {
          
          if(time === 0){
            setIsRunning(false)
            setIsDone(true)
           
            if(pomodoro){
              props.backgroundChange(colorLinks.break)
              setTime(shortbreakTimer.initialTime)
              setChosenTimer(shortbreakTimer.chooseTimer);
            }else if (shortbreak){
              props.backgroundChange(colorLinks.pomodoro)
              setTime(pomodoroTimer.initialTime)
              setChosenTimer(pomodoroTimer.chooseTimer);
            }else{
              props.backgroundChange(colorLinks.pomodoro)
              setTime(pomodoroTimer.initialTime)
              setChosenTimer(pomodoroTimer.chooseTimer);
            }

          }else{
            setTime(time - 1)
          }
          
        }, 1000)
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [time, isRunning, pomodoroTimer.initialTime, pomodoro, shortbreak, props, colorLinks.break, colorLinks.pomodoro, shortbreakTimer.initialTime, shortbreakTimer.chooseTimer, pomodoroTimer.chooseTimer]);
    
    function startStop(){
      setIsRunning((prev) => !prev);
      setIsDone(false);

    }

    // RESTARTING TIMER
    function restart(){
      if(pomodoro){
        setTime(shortbreakTimer.initialTime)
        setChosenTimer(shortbreakTimer.chooseTimer)
        props.backgroundChange(colorLinks.break)

      } else if (shortbreak){
        setTime(pomodoroTimer.initialTime)
        setChosenTimer(pomodoroTimer.chooseTimer)
        props.backgroundChange(colorLinks.pomodoro)
      } else {
        setTime(pomodoroTimer.initialTime)
        setChosenTimer(pomodoroTimer.chooseTimer)
        props.backgroundChange(colorLinks.pomodoro)
      }
      setIsRunning(false);
    }


    // CHOOSING COUNTDOWN LOGIC
    function handlePomodoro(e) {
      // prevents page from reloading
      e.preventDefault();
      // choses link to apply styling to
      setChosenTimer(pomodoroTimer.chooseTimer)
      // sets time according to the selected one
      setTime(pomodoroTimer.initialTime)
      setIsRunning(false);

      // sends chosen link to app.jsx
      props.backgroundChange(colorLinks.pomodoro)

    }
  
    function handleShortbreak(e) {
      e.preventDefault();
      setChosenTimer(shortbreakTimer.chooseTimer)
      setTime(shortbreakTimer.initialTime)
      setIsRunning(false);
      
      props.backgroundChange(colorLinks.break)

    }
    
    function handleLongBreak(e) {
      e.preventDefault();
      setChosenTimer(longbreakTimer.chooseTimer)
      setTime(longbreakTimer.initialTime)
      setIsRunning(false);
      
      props.backgroundChange(colorLinks.break)

    }

    function formatTime(time){
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}: ${String(seconds).padStart(2, "0")}`;
    }

  return (
    <div>
    

    {/* MODES */}
      
      <TimerButtons 
        chosenTimer={chosenTimer}
        activeButton={activeButton}
        inactiveButton={inactiveButton}
        handlers={{
          handlePomodoro,
          handleShortbreak,
          handleLongBreak
        }}
        labels={{
          pomodoroTimer,
          shortbreakTimer,
          longbreakTimer
        }}
      />

      {/* COUNTDOWN */}
       <h1 className='text-9xl'>{formatTime(time)}</h1>
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
