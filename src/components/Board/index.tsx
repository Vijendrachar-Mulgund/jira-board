import Button from "@mui/material/Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";
import { Status, Task } from "../../types";

import TaskCard from "../TaskCard";

export default function Board() {
  const navigate = useNavigate();

  const { board, setBoard } = useContext(TasksContext);

  const handleOnNewTask = () => {
    navigate("/new-task");
  };

  const handleOnDragStart = (event: React.DragEvent, task: Task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleOnDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: React.DragEvent) => {
    const eventData: string = event.dataTransfer.getData("task") as string;
    const selectedTask: Task = JSON.parse(eventData);
    const updateTaskOnBoard: Task[] = board[selectedTask?.status];

    const sourceTaskStatus: Status = selectedTask?.status;
    const destinationTaskStatus: Status = event.currentTarget?.id as Status;

    if (sourceTaskStatus === destinationTaskStatus) return;

    // Remove the task from the previous column
    const filteredTasks: Task[] = updateTaskOnBoard?.filter((item) => item?.id !== selectedTask?.id);

    const updatedTask: Task = { ...selectedTask, status: event.currentTarget?.id as Status };
    const updatedTasksOnDestinationBoard: Task[] = [...board[event.currentTarget?.id], updatedTask];

    // Put the updated array
    setBoard((prev: any) => {
      const updatedBoardItems = {
        ...prev,
        [sourceTaskStatus]: filteredTasks,
        [destinationTaskStatus]: updatedTasksOnDestinationBoard,
      };
      localStorage.setItem("tasks", JSON.stringify(updatedBoardItems));
      return updatedBoardItems;
    });
  };

  const handleOnEdit = (task: Task) => {
    navigate(`/edit-task/${task?.id}/${task?.status}`);
  };
  const handleOnDelete = (task: Task) => {
    console.log("task", task);
  };

  return (
    <>
      <div className="task-bar">
        <h1 className="page-header">RamSoft's Jira Board</h1>
        <Button onClick={handleOnNewTask} variant="contained">
          New Task
        </Button>
      </div>

      <div className="board">
        {Object.keys(board)?.map((item: any) => {
          return (
            <div key={item}>
              <div className="board-header">{item}</div>
              <div id={item} onDragOver={handleOnDragOver} onDrop={handleOnDrop} className="board-section">
                {board[item]?.map((task: Task) => {
                  return (
                    <TaskCard
                      key={task?.id}
                      onDragStart={(e: React.DragEvent) => handleOnDragStart(e, task)}
                      onEdit={() => handleOnEdit(task)}
                      onDelete={() => handleOnDelete(task)}
                      name={task?.name}
                      status={task?.status}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
