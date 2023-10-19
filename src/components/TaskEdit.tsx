type  Props  = {title: string, note: string, onDataReady: (title: string, note: string) => void}

const isValues = (x: unknown): x is {title: HTMLInputElement; note: HTMLInputElement} => {
  return true
}

const TaskEdit = ({ title, note, onDataReady }: Props) => {
  const  handleSubmit: React.FormEventHandler<HTMLFormElement> = event =>  {
    event.preventDefault();
    const values = event.target 
    if (isValues(values)) {
      onDataReady(values.title.value, values.note.value)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
        <input defaultValue={title} className="ml-10" name="title" />
        <button className="mr-10" type="submit">Zapisz</button>
        </div>
        <input defaultValue={note}  name="note" 
        className="mt-5 mx-7 background-note px-2 py-3 rounded-md w-11/12"
        />

        
      </form>
    </div>
  );
};

export default TaskEdit;
