import { useContext, useEffect, useState } from "react";
import { EditTaskProps, Status, Task } from "../../types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";

import TaskForm from "../TaskForm";
import dayjs, { Dayjs } from "dayjs";

export default function EditTask({ isView }: EditTaskProps) {
  const { taskId, status } = useParams();
  const navigate = useNavigate();

  const { board, setBoard } = useContext(TasksContext);

  const [editTask, setEditTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    deadline: null,
    status: Status.toDo,
  });

  useEffect(() => {
    if (taskId && status) {
      const taskToEdit: Task = board[status]?.find((element: Task) => element?.id === taskId);
      setEditTask(taskToEdit);
    }
  }, [taskId, status]);

  // Submit event
  const handleOnSaveTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (status) {
      const filteredTasks: Task[] = board[status]?.filter((item: Task) => item?.id !== taskId);

      if (status === editTask?.status) {
        filteredTasks.push(editTask);

        // Put the updated array
        setBoard((prev: any) => {
          const updatedBoardItems = {
            ...prev,
            [status]: filteredTasks,
          };
          localStorage.setItem("tasks", JSON.stringify(updatedBoardItems));
          return updatedBoardItems;
        });
      } else {
        const destinationTasksArray: Task[] = board[editTask?.status];
        destinationTasksArray.push(editTask);
        setBoard((prev: any) => {
          const updatedBoardItems = {
            ...prev,
            [status]: filteredTasks,
            [editTask?.status]: destinationTasksArray,
          };
          localStorage.setItem("tasks", JSON.stringify(updatedBoardItems));
          return updatedBoardItems;
        });
      }
    }

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
      <h1 className="page-header">{isView ? "View" : "Edit"} Task</h1>
      <h4 className="page-sub-header">Task ID : {taskId}</h4>
      <TaskForm
        task={editTask}
        handleOnSubmitTask={handleOnSaveTask}
        handleTaskNameChange={handleTaskNameChange}
        handleTaskDescriptionChange={handleTaskDescriptionChange}
        handleTaskDeadlineChange={handleTaskDeadlineChange}
        handleStatusChange={handleStatusChange}
        isEdit={true}
        isView={isView}
      />
    </>
  );
}
