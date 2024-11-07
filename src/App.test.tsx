import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Mocking the router to render the App component
describe("App", () => {
  it("renders learn react link", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const header = screen.getByTestId("main-container");
    expect(header).toBeTruthy();
  });
});
