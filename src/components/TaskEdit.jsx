const TaskEdit = ({ title, note, onDataReady }) => {
  function handleSubmit(event) {
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
