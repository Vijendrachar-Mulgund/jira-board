import Button from "@mui/material/Button";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";

export default function Board() {
  const navigate = useNavigate();

  const { board } = useContext(TasksContext);

  const handleOnNewTask = () => {
    navigate("/new-task");
  };

  useEffect(() => {
    console.log("The board", board);
  }, [board]);

  return (
    <>
      <div className="task-bar">
        <h1 className="page-header">RamSoft's Jira Board</h1>
        <Button onClick={handleOnNewTask} variant="contained">
          New Task
        </Button>
      </div>
    </>
  );
}
