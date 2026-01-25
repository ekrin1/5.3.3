import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "./AboutPage";
import { renderWithProviders } from "../../test/utils";

describe("AboutPage", () => {
  it("должен отображать страницу 'Обо мне' корректно", async () => {
    renderWithProviders(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.queryByText("Екатерина Котова")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(
        screen.queryByText(
          "Привет! Я - Frontend-разработчица. Пишу приложения на React + TypeScript + Redux Toolkit."
        )
      ).toBeInTheDocument();
    });
  });
});
