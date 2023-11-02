import "./App.css";
import Nav from "./components/Nav";
// import TimerButtons from './components/TimerButtons'
import Timer from "./components/Timer";
import AddTask from "./components/AddTask";
import { Task } from "./components/Tasks";
import { useTimer } from "./contexts/TimerContext";
import { HintDisplay } from "./components/HintDisplay";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { taskCreationActiveSlice } from "./state/slices/task-creation-active-slice";

function App() {
  const { backgroundColor, taskColor } = useTimer();
  // const clicked = useAtomValue(taskCreationActiveAtom)
  // const tasks = useAtomValue(taskAtom)
  const tasks = useAppSelector(state => state.taskSlice.tasks)
  // const setTaskCreationActive = useSetAtom(taskCreationActiveAtom);

  const dispatch = useAppDispatch();

  const clicked = useAppSelector(state => state.taskCreationActiveSlice.taskCreationActive)
  const setTaskCreationActive = (x: boolean) => dispatch(taskCreationActiveSlice.actions.setTaskCreationActive(x))  




  return (
    <>
      <div className={backgroundColor + " w-screen min-h-screen flex"}>
        <div className="container">
          <Nav />
          <div
            className={
              " timer-color timer-div text-center rounded-lg font-bold"
            }
          >
            <Timer />
          </div>
          <div className="text-center text-xl">
            <p className="mt-3">#1</p>
            <HintDisplay />
          </div>
          <div className="flex justify-between timer-div">
            <p>Tasks</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={"w-6 h-6 rounded-md  timer-color"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div className="mt-3">
            <hr className="timer-div "></hr>
          </div>
          <div className="mt-3">
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  id={task.id}
                  title={task.title}
                  note={task.note}
                  
                />
              );
            })}
          </div>

          {!clicked ? (
            <div
              className={
                "flex justify-center my-6 border-2 border-dotted border-white addtask " +
                taskColor
              }
            >
              <div className="flex my-3 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <button onClick={() => setTaskCreationActive(true)} className="mx-2">
                  Add Task
                </button>
              </div>
            </div>
          ) : (
            <AddTask
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
