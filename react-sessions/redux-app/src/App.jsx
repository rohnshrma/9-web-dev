import { useSelector } from "react-redux";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  const todos = useSelector((state) => state.todos);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <h1>ReduX Todo List</h1>
      <AddTodoForm />
      <TodoList />
      {todos.length > 0 && (
        <p className="summary">
          {completedCount} of {todos.length} done
        </p>
      )}
    </div>
  );
};

export default App;
