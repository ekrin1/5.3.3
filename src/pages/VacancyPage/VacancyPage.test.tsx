import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { VacancyPage } from "./VacancyPage";
import { renderWithProviders } from "../../test/utils";
import * as hooks from "../../store/hooks";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useLocation: () => ({
      state: {
        vacancy: {
          id: "1",
          name: "Frontend Developer",
          area: { name: "Москва" },
          employer: { name: "Yandex" },
          salary: { from: 100000, to: 200000, currency: "RUB" },
          experience: { id: "between1And3", name: "От 1 года до 3 лет" },
          work_format: [{ id: "REMOTE", name: "Удалённая работа" }],
          snippet: {
            requirement: "Lorem ipsumLorem ipsum dolor sit amet",
            responsibility: "Ut enim ad minim veniam",
          },
          alternate_url: "https://hh.ru/vacancy/1",
        },
      },
    }),
  };
});

const mockDispatch = vi.fn();
vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);

vi.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
  selector({
    vacancies: {
      items: [],
      loading: false,
    },
  } as any)
);

describe("VacancyPage", () => {
  it("Страница вакансии отображается корректно", () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Yandex")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(
      screen.getByText("Lorem ipsumLorem ipsum dolor sit amet")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ut enim ad minim veniam")
    ).toBeInTheDocument();
  });

  it('Должна открываться страница вакансии при клике на кнопку "Откликнуться на hh.ru"', () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /откликнуться/i });

    expect(link).toHaveAttribute("href", "https://hh.ru/vacancy/1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
