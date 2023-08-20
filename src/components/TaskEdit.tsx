type  Props  = {title: string, note: string, onDataReady: (title: string, note: string) => void}

const TaskEdit = ({ title, note, onDataReady }: Props) => {
  function handleSubmit(event: any) {
    event.preventDefault();
    onDataReady(event.target.title.value, event.target.note.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input defaultValue={title} name="title" />
        <input defaultValue={note} name="note" />
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default TaskEdit;
