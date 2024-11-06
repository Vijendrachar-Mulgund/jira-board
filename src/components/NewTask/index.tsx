import { useEffect, useState } from "react";
import { Status, Task } from "../../types";
import TaskForm from "../TaskForm";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router";

export default function NewTask() {
  const navigate = useNavigate();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    deadline: null,
    status: Status.toDo,
  });

  useEffect(() => {
    const localData: any = localStorage.getItem("tasks");

    if (localData) {
      setAllTasks(JSON.parse(localData));
    }
  }, []);

  // Submit event
  const handleOnCreateNewTask = (event: React.FormEvent) => {
    event.preventDefault();

    // Generate an ID for the task
    const taskId = crypto.randomUUID();
    const newTaskObject: Task = { ...newTask, id: taskId };

    allTasks.push(newTaskObject);

    // Save the tasks to the local storage
    localStorage.setItem("tasks", JSON.stringify(allTasks));

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
      />
    </>
  );
}
