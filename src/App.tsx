import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path="/new-task" element={<TaskForm />}></Route>
          <Route path="/edit-task/:task-id" element={<TaskForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
