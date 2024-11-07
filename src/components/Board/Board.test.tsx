import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContext";
import Board from "./index";
import { vi } from "vitest";
import { Status } from "../../types";

const mockSetBoard = vi.fn();

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
          <Board />
        </BrowserRouter>
      </TasksContext.Provider>,
    );
  });

  it("should render the board with tasks", () => {
    expect(screen.getByText("RamSoft's Jira Board")).toBeInTheDocument();
  });

  it("should render the add new task button", () => {
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("should render the board columns", () => {
    expect(screen.getAllByTestId(`${Status.toDo}-COLUMN`)).toBeDefined();
    expect(screen.getAllByTestId(`${Status.inProgress}-COLUMN`)).toBeDefined();
    expect(screen.getAllByTestId(`${Status.done}-COLUMN`)).toBeDefined();
  });

  it("should render the tasks in the board", () => {
    expect(screen.getByText("Test One")).toBeInTheDocument();
    expect(screen.getByText("Test Two")).toBeInTheDocument();
  });
});
