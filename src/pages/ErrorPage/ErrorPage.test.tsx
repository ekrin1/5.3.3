import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { renderWithProviders } from "../../test/utils";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ErrorPage", () => {
  it("должен отображать текст ошибки и кнопки", () => {
    renderWithProviders(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Упс! Такой страницы не существует")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Давайте перейдём к началу.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "На главную" })
    ).toBeInTheDocument();
  });

  it("должен перейти на /vacancies при нажатии кнопки", () => {
    renderWithProviders(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "На главную" });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/vacancies");
  });
});
