import { useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../api/todoApi";
const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [todoList, setTodoList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const fetchTodos = async () => {
    const data = await getTodos();
    setTodoList(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && idEdit) {
      await updateTodo(idEdit, inputValue);
      fetchTodos();
      setIsEditing(false);
      setInputValue("");
      setIdEdit("");
    } else {
      await createTodo(inputValue);
      fetchTodos();
      setInputValue("");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg bg-purple border border-purple-500 rounded-xl p-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="task">Add New Task</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded m-4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="task"
              name="task"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow focus:outline-none focus:bg-white focus:border-purple-500">
              {isEditing ? "save edit" : "Add"}
            </button>
          </form>
          {todoList &&
            todoList.map((todo) => {
              return (
                <div
                  key={todo._id}
                  className="shadow-lg bg-purple border border-purple-500 rounded-xl p-2 flex justify-center items-center"
                >
                  <div className="mr-40">{todo.item}</div>
                  <button
                    onClick={() => {
                      setInputValue(todo.item);
                      setIsEditing(true);
                      setIdEdit(todo._id);
                    }}
                    className="mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow focus:outline-none focus:bg-white focus:border-purple-500"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow focus:outline-none focus:bg-white focus:border-purple-500"
                    onClick={async () => {
                      await deleteTodo(todo._id);
                      fetchTodos();
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Input;
