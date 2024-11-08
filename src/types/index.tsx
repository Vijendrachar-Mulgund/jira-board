import { SelectChangeEvent } from "@mui/material/Select";
import { Dayjs } from "dayjs";

export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: Dayjs | null;
  status: Status;
}

export enum Status {
  toDo = "TODO",
  inProgress = "INPROGRESS",
  done = "DONE",
}

export interface TaskFormProps {
  task: Task;
  isEdit: boolean;
  isView: boolean;
  handleTaskNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskDeadlineChange: (selectedDate: Dayjs | null) => void;
  handleStatusChange: (event: SelectChangeEvent<Status>) => void;
  handleOnSubmitTask: (event: React.FormEvent) => void;
}

export interface BoardType {
  [Status.toDo]: Task[];
  [Status.inProgress]: Task[];
  [Status.done]: Task[];
}

export interface BoardContextType {
  board: BoardType;
  setBoard: (board: BoardType) => void;
}

export interface EditTaskProps {
  isView: boolean;
}

export interface TaskCardProps {
  name: string;
  status: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}
