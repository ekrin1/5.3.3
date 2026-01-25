import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { CitiesFilter } from "./CitiesFilter";
import { renderWithProviders } from "../../test/utils";
import * as hooks from "../../store/hooks";
import { setCity, setPage } from "../../store/vacanciesSlice";

const mockDispatch = vi.fn();

vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);

vi.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
  selector({
    vacancies: {
      city: "moscow",
    },
  } as any)
);

describe("CitiesFilter", () => {
  it("рендерит вкладки городов", () => {
    renderWithProviders(<CitiesFilter />);

    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("Санкт-Петербург")).toBeInTheDocument();
  });

  it("диспатчит экшены при выборе города", () => {
    renderWithProviders(<CitiesFilter />);

    const moscowTab = screen.getByText("Москва");

    fireEvent.click(moscowTab);

    expect(mockDispatch).toHaveBeenCalledWith(setCity("moscow"));
    expect(mockDispatch).toHaveBeenCalledWith(setPage(1));
  });
});
