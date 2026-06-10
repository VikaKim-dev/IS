const ToDo = ({ todo, toggleTask, removeTask }) => {
  return (
    <div className={`note-card ${todo.complete ? 'note-completed' : ''}`}>
      <div className="note-content" onClick={() => toggleTask(todo.id)}>
        {todo.task}
      </div>
      <button className="note-delete" onClick={() => removeTask(todo.id)}>
        Удалить карточку
      </button>
    </div>
  );
};

export default ToDo;