import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";
import { vi } from "vitest";
import TaskForm from "./index";
import { Status } from "../../types";

const task = {
  id: "",
  name: "",
  description: "",
  deadline: null,
  status: Status.toDo,
};

const mockSetBoard = vi.fn();
const mockHandleTaskNameChange = vi.fn();
const mockHandleTaskDescriptionChange = vi.fn();
const mockHandleTaskDeadlineChange = vi.fn();
const mockHandleStatusChange = vi.fn();
const mockHandleOnSubmitTask = vi.fn();

const mockBoard = {
  [Status.toDo]: [
    {
      id: "2e60d3da-728d-4b25-bf5c-aea8aa101fb0",
      name: "Test One",
      description: "This is a test desc 1",
      deadline: "2024-11-22T18:30:00.000Z",
      status: "TODO",
    },
    {
      id: "855176b1-0601-4462-bcda-6f58ec4ed769",
      name: "Test Two",
      description: "This is a test desc 2",
      deadline: "2024-12-05T18:30:00.000Z",
      status: "TODO",
    },
  ],
  [Status.inProgress]: [],
  [Status.done]: [],
};

describe("Board Component", () => {
  beforeEach(() => {
    render(
      <TasksContext.Provider value={{ board: mockBoard, setBoard: mockSetBoard }}>
        <BrowserRouter>
          <TaskForm
            task={task}
            handleTaskNameChange={mockHandleTaskNameChange}
            handleTaskDescriptionChange={mockHandleTaskDescriptionChange}
            handleTaskDeadlineChange={mockHandleTaskDeadlineChange}
            handleStatusChange={mockHandleStatusChange}
            handleOnSubmitTask={mockHandleOnSubmitTask}
            isEdit={false}
            isView={false}
          />
        </BrowserRouter>
      </TasksContext.Provider>,
    );
  });

  test("should render the name field", () => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  test("should render the description field", () => {
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  test("should render the deadline field", () => {
    expect(screen.getByLabelText("Deadline")).toBeInTheDocument();
  });

  test("should render the status field", () => {
    expect(screen.getByTestId("status-select-element")).toBeInTheDocument();
  });

  test("should render the submit button", () => {
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  test("should call handleTaskNameChange when the name field changes", () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Test Task" } });
    expect(mockHandleTaskNameChange).toHaveBeenCalled();
  });

  test("should call handleTaskDescriptionChange when the description field changes", () => {
    const descriptionField = screen.getByLabelText("Description");
    fireEvent.change(descriptionField, { target: { value: "Test Description" } });
    expect(mockHandleTaskDescriptionChange).toHaveBeenCalled();
  });

  test("should call handleTaskDeadlineChange when the deadline field changes", () => {
    const deadlineField = screen.getByLabelText("Deadline");
    fireEvent.change(deadlineField, { target: { value: "25-12-2020" } });
    expect(mockHandleTaskDeadlineChange).toHaveBeenCalled();
  });
});
