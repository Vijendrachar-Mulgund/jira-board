import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Board from "./components/Board";
import NewTask from "./components/NewTask";
import EditTask from "./components/EditTask";
import { TasksContext } from "./contexts/TasksContext";
import { Status } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState({
    [Status.toDo]: [],
    [Status.inProgress]: [],
    [Status.done]: [],
  });

  useEffect(() => {
    const localData: any = localStorage.getItem("tasks");

    if (localData) {
      setBoard(JSON.parse(localData));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <TasksContext.Provider value={{ board, setBoard }}>
          <Routes>
            <Route path="/" element={<Board />}></Route>
            <Route path="/new-task" element={<NewTask />}></Route>
            <Route path="/edit-task/:taskId/:status" element={<EditTask isView={false} />}></Route>
            <Route path="/view-task/:taskId/:status" element={<EditTask isView={true} />}></Route>
          </Routes>
        </TasksContext.Provider>
      </div>
    </>
  );
}

export default App;
