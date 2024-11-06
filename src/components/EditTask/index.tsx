import { useEffect, useState } from "react";
import { Status, Task } from "../../types";
import TaskForm from "../TaskForm";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    deadline: null,
    status: Status.toDo,
  });

  useEffect(() => {
    const localData = localStorage.getItem("tasks");

    if (localData) {
      setAllTasks(JSON.parse(localData));
    }
  }, [taskId]);

  useEffect(() => {
    if (allTasks?.length > 0) {
      const taskToEdit: Task | undefined = allTasks.find((task) => task?.id === taskId);
      if (taskToEdit) setEditTask(taskToEdit);
    }
  }, [allTasks]);

  // Submit event
  const handleOnCreateNewTask = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("this is refactored code edit task -> ", editTask);

    // Delete the existing object from the array
    const filteredTasks = allTasks.filter((task) => task.id !== taskId);

    // Add the new Item
    filteredTasks.push(editTask);

    // Save
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));

    navigate("/");
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask({
      ...editTask,
      name: event?.target?.value,
    });
  };

  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask({
      ...editTask,
      description: event?.target?.value,
    });
  };

  const handleTaskDeadlineChange = (selectedDate: Dayjs | null) => {
    setEditTask({
      ...editTask,
      deadline: dayjs(selectedDate, { format: "DD-MM-YYYY" }),
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    setEditTask({
      ...editTask,
      status: event?.target?.value as Status,
    });
  };

  return (
    <>
      <h1 className="page-header">Edit Task</h1>
      <h4 className="page-sub-header">Task ID : {taskId}</h4>
      <TaskForm
        task={editTask}
        handleOnSubmitTask={handleOnCreateNewTask}
        handleTaskNameChange={handleTaskNameChange}
        handleTaskDescriptionChange={handleTaskDescriptionChange}
        handleTaskDeadlineChange={handleTaskDeadlineChange}
        handleStatusChange={handleStatusChange}
        isEdit={true}
      />
    </>
  );
}
