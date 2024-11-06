import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

import { Status, TaskFormProps } from "../../types";

import "./index.css";

export default function TaskForm({
  task,
  handleTaskNameChange,
  handleTaskDescriptionChange,
  handleTaskDeadlineChange,
  handleStatusChange,
  handleOnSubmitTask,
}: TaskFormProps) {
  return (
    <>
      <div>
        <form onSubmit={handleOnSubmitTask}>
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
