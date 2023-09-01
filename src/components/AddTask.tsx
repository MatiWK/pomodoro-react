import { ChangeEventHandler, useContext } from "react";
import { Context } from "../contexts/CounterContext";
import { useTask } from "../contexts/TaskContext";
import { IncrementButton } from "./IncrementButton";
import { DecrementButton } from "./DecrementButton";
import { InputCount } from "./InputCount";

const AddTask = () => {
  const {
    addClicked,
    setAddClicked,
    values,
    handleChange,
    createTask,
    cancelCreate,
  } = useTask();

  const value = useContext(Context);
  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { value, name } = event.target;
    handleChange(value, name)
  } 

  return (
    <div className="addtask-background addtask addtask-text-color font-bold rounded-xl ">
      <form className="my-3">
        <div className="mx-3">
          <input
            type="text"
            placeholder="What are you working on?"
            value={values.title}
            name="title"
            className="text-2xl mt-3"
            onChange={handleInputChange}
          ></input>
          <h1 className="my-5 text-xl">Est Pomodoros {value}</h1>
          <div className="flex">
            <InputCount />

            <IncrementButton />
            <DecrementButton />
          </div>
          <div>
            {!addClicked ? (
              <button
                type="button"
                onClick={() => setAddClicked(true)}
                style={{ color: "#a3a3a3" }}
                className="text-sm my-5 underline"
              >
                + Add Note{" "}
              </button>
            ) : (
              <textarea
                value={values.note}
                name="note"
                onChange={handleInputChange}
                className="textarea-background my-3 rounded-md font-light"
              ></textarea>
            )}
          </div>
        </div>

        <div
          className="flex justify-end px-2 py-3 rounded-b-xl"
          style={{ backgroundColor: "#efefef" }}
        >
          <button
            name="cancel"
            type="button"
            className="mx-2"
            onClick={cancelCreate}
          >
            Cancel
          </button>
          <button name="save" type="button" onClick={createTask}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
