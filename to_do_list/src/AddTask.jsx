import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [note, setNote] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    addTask(note);
    setNote("");
  };

  return (
    <form onSubmit={handleCreate} className="note-creator">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Напишите задачу здесь..."
        className="note-textarea"
        rows="3"
      ></textarea>
      <button className="note-save">Сохранить</button>
    </form>
  );
};

export default ToDoForm;