type  Props  = {title: string, note: string, onDataReady: (title: string, note: string) => void}

const TaskEdit = ({ title, note, onDataReady }: Props) => {
  function handleSubmit(event: any) {
    event.preventDefault();
    onDataReady(event.target.title.value, event.target.note.value);
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
