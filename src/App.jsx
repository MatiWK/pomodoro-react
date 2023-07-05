import {  useState } from 'react'
import './App.css'
import Nav from './components/Nav'
// import TimerButtons from './components/TimerButtons'
import Timer from './components/Timer'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'

function App() {
  const [backgroundColor, setbackgroundColor] = useState("background-pomodoro");
  const [taskColor, setTaskColor] = useState("taskbox-pomodoro")
  const [running, isRunning] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [tasks, setTasks] = useState([]);
  // const [editing, setEditing] = useState(false);
  

  function colorSwitch(name){
    if (name === "Pomodoro") {
      setbackgroundColor("background-pomodoro") 
      setTaskColor("taskbox-pomodoro")
      isRunning(true)
    } else {
      setbackgroundColor("background-break") 
      setTaskColor("taskbox-break")
      isRunning(false)
    }
  }
  
  function createTasks(title, note){
    setTasks((prev) => {
      return [...prev, {title: title, note: note, exist: true}]
    });
    console.log(tasks)
  }

 function deleteitem(id){
    setTasks(() => tasks.filter((task, index) => index !== id));
 }

 function editTask(id) {
    setTasks(() => tasks.filter((task, index) => {
      // setEditing(true);
      return index !== id
    }))
   
 }


  return (
    <>
    <div className={backgroundColor  + " w-screen min-h-screen flex"}>
      <div className='container' >
        <Nav />
        <div className={' timer-color timer-div text-center rounded-lg font-bold'}>
          <Timer backgroundChange={colorSwitch} />
          
        </div>
        <div className='text-center text-xl'>
          <p className='mt-3' >#1</p>
          {running ? <p>Time to focus!</p> : <p>Time for a Break! </p>} 
        </div>
        <div className='flex justify-between timer-div'>
          <p>Tasks</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 rounded-md  timer-color"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className='mt-3'>
          <hr className='timer-div '></hr>
        </div>
        <div className='mt-3'>

          {tasks.map((task, index) => {
            return (
              
              <Tasks
              key={index}
              id={index}
              title={task.title}
              note={task.note}
              deleteTask={deleteitem}
              editTask={editTask}
              />
            );
          })}
        </div>
        
        
        {!clicked ? (<div className={'flex justify-center my-6 border-2 border-dotted border-white addtask ' + taskColor}>
          
          <div className='flex my-3 font-bold'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <button onClick={() => setClicked(true)} className='mx-2'>Add Task</button>
          </div>
          
        </div>) : <AddTask sendValues={createTasks} cancelCreation={() => setClicked(false)} />}



      </div>
    </div>
    </>
  )
}

export default App
