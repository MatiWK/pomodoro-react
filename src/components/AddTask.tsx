import { ChangeEventHandler } from "react";
import { IncrementButton } from "./IncrementButton";
import { DecrementButton } from "./DecrementButton";
import { InputCount } from "./InputCount";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { AddClickedSlice } from "../state/slices/note-slice";
import { taskCreationActiveSlice } from "../state/slices/task-creation-active-slice";
import { valuesSlice } from "../state/slices/values-slice";
import { taskSlice } from "../state/slices/task-slice";

const AddTask = () => {
  const values = useAppSelector(state => state.valuesSlice.values);
  const setValues = (x: {title: string, note: string}) => dispatch(valuesSlice.actions.setValues(x))
  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { value, name } = event.target;
    handleChange(value, name)
  } 

  const dispatch = useAppDispatch();
  const addClicked = useAppSelector(state => state.AddClickedSlice.addClicked);
  const setAddClicked = (x: boolean) => dispatch(AddClickedSlice.actions.setAddClicked(x))

  const setTaskCreationActive = (x: boolean) => dispatch(taskCreationActiveSlice.actions.setTaskCreationActive(x))  

  const handleCreateTask = () => {
    dispatch(taskSlice.actions.createTask({
      title: values.title, 
      note: values.note
    }))
    setAddClicked(false);
    setValues({ title: "", note: "" });
    setTaskCreationActive(false);
  };
  const cancelCreate = () => {
    setAddClicked(false);
    setValues({ title: "", note: "" });
    setTaskCreationActive(false);

  };

  const handleChange = (value: string, name: string) => {
    const updateValues = {
      ...values,
      [name]: value,
    };
    setValues(updateValues);

  };

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
          <div className="flex">
            <InputCount />

            <IncrementButton />
            <DecrementButton />
          </div>
          <div>
            {!addClicked ? (
              <button
                type="button"
                // getting setAddClicked to redux
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
          <button name="save" type="button" onClick={handleCreateTask}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
