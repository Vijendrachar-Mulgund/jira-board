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
  isEdit,
  isView,
}: TaskFormProps) {
  return (
    <>
      <div>
        <form onSubmit={handleOnSubmitTask}>
          <div className="form-container">
            <FormControl className="form-field">
              <TextField
                disabled={isView}
                onChange={handleTaskNameChange}
                value={task?.name}
                id="name"
                label="Name"
                variant="outlined"
              />
            </FormControl>

            <FormControl className="form-field">
              <TextField
                disabled={isView}
                onChange={handleTaskDescriptionChange}
                id="description"
                value={task.description}
                label="Description"
                variant="outlined"
              />
            </FormControl>

            <FormControl className="form-field">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={isView}
                  value={task.deadline ? dayjs(task.deadline, { format: "DD-MM-YYYY" }) : null}
                  format="DD-MM-YYYY"
                  onChange={handleTaskDeadlineChange}
                  label="Deadline"
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl className="form-field">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select disabled={isView} id="status" value={task.status} label="Status" onChange={handleStatusChange}>
                {Object.values(Status).map((taskStatus) => (
                  <MenuItem key={taskStatus} value={taskStatus}>
                    {taskStatus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button disabled={isView} className="form-field" type="submit" variant="contained">
              {isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
