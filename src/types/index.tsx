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
