import axios from "axios";

const todoApi = axios.create({
  baseURL: "https://mern-todolist-back.onrender.com",
});

export const getTodos = async () => {
  const response = await todoApi.get("/todos");
  return response.data;
};
export const createTodo = async (item) => {
  const response = await todoApi.post(
    "/todos",
    { item },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const deleteTodo = async (id) => {
  const response = await todoApi.delete(`/todos/${id}`);
  return response.data;
};

export const updateTodo = async (id, item) => {
  const response = await todoApi.put(
    `/todos/${id}`,
    { item },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
