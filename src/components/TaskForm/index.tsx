import { useState } from "react";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";

import { Task, Status } from "../../types";

import "./index.css";

export default function TaskForm() {
  const [task, setTask] = useState<Task>({
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
    const newTask: Task = { ...task, id: taskId };
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      name: event?.target?.value,
    });
  };

  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      description: event?.target?.value,
    });
  };

  const handleTaskDeadlineChange = (selectedDate: Dayjs | null) => {
    setTask({
      ...task,
      deadline: dayjs(selectedDate, { format: "DD-MM-YYYY" }),
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    setTask({
      ...task,
      status: event?.target?.value as Status,
    });
  };

  return (
    <>
      <h1 className="page-header"> Create New Task</h1>
      <div>
        <form onSubmit={handleOnCreateNewTask}>
          <div className="form-container">
            <FormControl className="form-field">
              <TextField onChange={handleTaskNameChange} value={task?.name} id="name" label="Name" variant="outlined" />
            </FormControl>

            <FormControl className="form-field">
              <TextField
                onChange={handleTaskDescriptionChange}
                id="description"
                label="Description"
                variant="outlined"
              />
            </FormControl>

            <FormControl className="form-field">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={task.deadline ? dayjs(task.deadline, { format: "DD-MM-YYYY" }) : null}
                  format="DD-MM-YYYY"
                  onChange={handleTaskDeadlineChange}
                  label="Deadline"
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl className="form-field">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select id="status" value={task.status} label="Status" onChange={handleStatusChange}>
                {Object.values(Status).map((taskStatus) => (
                  <MenuItem key={taskStatus} value={taskStatus}>
                    {taskStatus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button className="form-field" type="submit" variant="contained">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
