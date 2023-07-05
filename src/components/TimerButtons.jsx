const TimerButtons = ({ chosenTimer, activeButton, inactiveButton, handlers, labels }) => {



  return (
        <div className=' my-3 py-3'>
            <a href={labels.pomodoroTimer.label}  
            className={chosenTimer.pomodoro ? activeButton : inactiveButton} 
            onClick={handlers.handlePomodoro} 
            >Pomodoro
            </a>
            <a href={labels.shortbreakTimer.label}
            className={chosenTimer.shortbreak ? activeButton : inactiveButton} 
            onClick={handlers.handleShortbreak}
            >
            Short Break
            </a>
            <a href={labels.longbreakTimer.label}
            className={chosenTimer.longbreak ? activeButton : inactiveButton} 
            onClick={handlers.handleLongBreak}
            >
            Long Break
            </a>
        </div>
        

  )
}

export default TimerButtons
