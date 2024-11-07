import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";
import { vi } from "vitest";
import TaskCard from "./index";
import { Status } from "../../types";

const mockSetBoard = vi.fn();
const mockOnDragStart = vi.fn();
const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();
const mockOnView = vi.fn();

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
          <TaskCard
            name={"Task Test One"}
            status={Status.toDo}
            onDragStart={mockOnDragStart}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            onView={mockOnView}
          />
        </BrowserRouter>
      </TasksContext.Provider>,
    );
  });

  test("should render the task name", () => {
    expect(screen.getByText("Task Test One")).toBeInTheDocument();
  });

  test("should render the task status", () => {
    expect(screen.getByText(Status.toDo)).toBeInTheDocument();
  });

  test("should render the details button", () => {
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  test("should render the edit button", () => {
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("should render the delete button", () => {
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("should call onView when the details button is clicked", () => {
    screen.getByText("Details").click();
    expect(mockOnView).toHaveBeenCalled();
  });

  test("should call onEdit when the edit button is clicked", () => {
    screen.getByText("Edit").click();
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test("should call onDelete when the delete button is clicked", () => {
    screen.getByText("Delete").click();
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
