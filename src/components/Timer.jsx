import { useContext } from 'react'
import TimerButtons from './TimerButtons';
import { IsRunning, useTimer } from '../contexts/CounterContext';
import { modes } from '../contexts/modes';
import { formatTime } from './formatTime';
import { colorLinks } from './colorLinks';

  // POSSIBLE COUNTDOWN LENGTHS
  


const Timer = () => {
  const {pomodoroTimer, shortbreakTimer, longbreakTimer} = modes;
    
    // const [time, setTime] = useContext(Time)
    const {time, setTime, chosenTimer, setChosenTimer, colorSwitch} = useTimer()
    const [isRunning, setIsRunning] = useContext(IsRunning)
    // const [chosenTimer, setChosenTimer] = useContext(ChoosenTimer)

    
    

   

    
    // DECONSTRUCTION TO MAKE IT MORE APPEALING TO AN EYE
    const {pomodoro, shortbreak} = chosenTimer;
    
    const inactiveButton = "mx-3"
    const activeButton = inactiveButton + " transparent-background px-2 py-1 rounded-lg";

   
    
    function startStop(){
      setIsRunning((prev) => !prev);

    }

    // RESTARTING TIMER
    function restart(){
      if(pomodoro){
        setTime(shortbreakTimer.initialTime)
        setChosenTimer(shortbreakTimer.chooseTimer)
        colorSwitch(colorLinks.break)

      } else if (shortbreak){
        setTime(pomodoroTimer.initialTime)
        setChosenTimer(pomodoroTimer.chooseTimer)
        colorSwitch(colorLinks.pomodoro)
      } else {
        setTime(pomodoroTimer.initialTime)
        setChosenTimer(pomodoroTimer.chooseTimer)
        colorSwitch(colorLinks.pomodoro)
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
      colorSwitch(colorLinks.pomodoro)

    }
  
    function handleShortbreak(e) {
      e.preventDefault();
      setChosenTimer(shortbreakTimer.chooseTimer)
      setTime(shortbreakTimer.initialTime)
      setIsRunning(false);
      
      colorSwitch(colorLinks.break)

    }
    
    function handleLongBreak(e) {
      e.preventDefault();
      setChosenTimer(longbreakTimer.chooseTimer)
      setTime(longbreakTimer.initialTime)
      setIsRunning(false);
      
      colorSwitch(colorLinks.break)

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

       </div>
        
    </div>
  )
}

export default Timer


