import { FormControl, TextField } from "@mui/material";

import "./index.css";

export default function TaskForm() {
  return (
    <>
      <h1 className="page-header"> Create New Task</h1>
      <div>
        <form>
          <div className="form-container">
            <FormControl className="form-field">
              <TextField id="outlined-basic" label="Name" variant="outlined" />
            </FormControl>

            <FormControl className="form-field">
              <TextField id="outlined-basic" label="Description" variant="outlined" />
            </FormControl>

            <FormControl className="form-field">
              <TextField id="outlined-basic" label="Name" variant="outlined" />
            </FormControl>
          </div>
        </form>
      </div>
    </>
  );
}
