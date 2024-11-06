import { useState } from "react";
import { Status, Task } from "../../types";
import TaskForm from "../TaskForm";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";

export default function NewTask() {
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
    const taskId = crypto.randomUUID();
    const newTaskObject: Task = { ...newTask, id: taskId };
    console.log("this is refactored code -> ", newTaskObject);
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
        setTask={setNewTask}
        handleOnSubmitTask={handleOnCreateNewTask}
        handleTaskNameChange={handleTaskNameChange}
        handleTaskDescriptionChange={handleTaskDescriptionChange}
        handleTaskDeadlineChange={handleTaskDeadlineChange}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
}
