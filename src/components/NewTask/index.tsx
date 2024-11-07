import { useContext, useState } from "react";
import { BoardType, Status, Task } from "../../types";
import TaskForm from "../TaskForm";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router";
import { TasksContext } from "../../contexts/TasksContext";

export default function NewTask() {
  const navigate = useNavigate();

  const { board, setBoard } = useContext(TasksContext);

  const [newTask, setNewTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    deadline: null,
    status: Status.toDo,
  });

  // Submit event
  const handleOnCreateNewTask = (event: React.FormEvent) => {
    event.preventDefault();

    // Generate an ID for the task
    const taskId = crypto.randomUUID();
    const newTaskObject: Task = { ...newTask, id: taskId };

    const updateBoardItems: Task[] = board[newTask.status];

    updateBoardItems?.push(newTaskObject);

    setBoard((prev: BoardType) => {
      const updatedBoardItems = { ...prev, [newTask?.status]: updateBoardItems };
      localStorage.setItem("tasks", JSON.stringify(updatedBoardItems));
      return updatedBoardItems;
    });

    navigate("/");
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      name: event?.target?.value,
    });
  };

  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      description: event?.target?.value,
    });
  };

  const handleTaskDeadlineChange = (selectedDate: Dayjs | null) => {
    setNewTask({
      ...newTask,
      deadline: dayjs(selectedDate, { format: "DD-MM-YYYY" }),
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    setNewTask({
      ...newTask,
      status: event?.target?.value as Status,
    });
  };

  return (
    <>
      <h1 className="page-header">Create New Task</h1>
      <TaskForm
        task={newTask}
        handleOnSubmitTask={handleOnCreateNewTask}
        handleTaskNameChange={handleTaskNameChange}
        handleTaskDescriptionChange={handleTaskDescriptionChange}
        handleTaskDeadlineChange={handleTaskDeadlineChange}
        handleStatusChange={handleStatusChange}
        isEdit={false}
        isView={false}
      />
    </>
  );
}
