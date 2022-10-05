import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [modify, setModify] = useState(false);
  const [modifyTodo, setModifyTodo] = useState("");
  const onModify = (id, value) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, modify: true } : { ...todo, modify: false }
      )
    );
    setModifyTodo(value);
  };
  const deleteBtn = (index) => {
    setToDos((curToDos) =>
      curToDos.filter((_, todoIndex) => index !== todoIndex)
    );
  };

  const onChange = (event) => setToDo(event.target.value);
  const onModifyChange = (event) => setModifyTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    const newTodo = {
      id: Date.now(),
      value: toDo,
      check: false,
      modify: false,
    };
    setToDos((previousTodo) => [newTodo, ...previousTodo]);
    setToDo("");
  };
  const onModifySubmit = (event) => {
    event.preventDefault();
    if (modify !== "") {
      setToDos(
        toDos.map((todo) =>
          todo.modify === true
            ? { ...todo, value: modifyTodo, modify: false }
            : todo
        )
      );
    }
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        ></input>
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((todo, index) => {
          console.log(todo);
          return (
            <li key={todo.id}>
              {todo.modify ? (
                <form onSubmit={onModifySubmit}>
                  <input
                    onChange={onModifyChange}
                    value={modifyTodo}
                    type="text"
                  ></input>
                </form>
              ) : (
                <span>{todo.value}</span>
              )}
              {todo.modify ? (
                <button onClick={onModifySubmit}>🔨</button>
              ) : (
                <>
                  <button onClick={() => onModify(todo.id, todo.value)}>
                    🔨
                  </button>
                  <button onClick={() => deleteBtn(index)}>❌</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default App;
