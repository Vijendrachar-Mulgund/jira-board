import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Board from "./components/Board";
// import TaskForm from "./components/TaskForm";
import NewTask from "./components/NewTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path="/new-task" element={<NewTask />}></Route>
          <Route path="/edit-task/:taskId" element={<EditTask />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
