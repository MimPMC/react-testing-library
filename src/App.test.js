import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("should render Loading.. text", () => {
  render(<App />);
  expect(screen.getByText("Loading..")).toBeInTheDocument();
});

test("should render the right amount of user cards", async () => {
  render(<App />);
  const user = userEvent.setup();
  await waitFor(async () =>
    expect(screen.queryByText("Loading..")).toBeNull()
  );

  const btn = screen.getByRole("button");
  await user.click(btn);

  const userCards = screen.getAllByText("Email:", { exact: false });
  expect(userCards).toHaveLength(3);
});

test("should display no user cards after press of toggle button", async () => {
  render(<App />);
  const user = userEvent.setup();
  await waitFor(async () =>
    expect(screen.queryByText("Loading..")).toBeNull()
  );

  const btn = screen.getByRole("button");
  await user.dblClick(btn);

  expect(
    screen.queryByText("Email:", { exact: false })
  ).toBeNull();
});

test("should display the text 'User card is hidden' after toggling the button", async () => {
  render(<App />);
  const user = userEvent.setup();
  await waitFor(async () =>
    expect(screen.queryByText("Loading..")).toBeNull()
  );

  const btn = screen.getByRole("button");
  await user.dblClick(btn);

  expect(screen.getByText("All users currently hidden")).toBeInTheDocument();

});

describe("Tests on lists", () => {
  test("Testing if card works with other props", () => {
    const cardInfo = {
      name: "John ddd",
      email: "dddddddddddd@example.com",
      phone: "123-456-440",
    };

    render(<UserCard user={cardInfo} />);

    expect(screen.getByText(cardInfo.name)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${cardInfo.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Phone: ${cardInfo.phone}`)).toBeInTheDocument();
  });
  test("Loading to be in document in start and disappear", async () => {
    render(<App />);
    await screen.findByText("Loading..");
    await waitFor(() => {
      expect(screen.queryByText("Loading..")).toBeNull();
    });
  });

  test("renders the correct number of User Cards", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText("Loading..")).toBeNull();
    });
    const toggleButton = screen.getByRole("button");
    await userEvent.click(toggleButton);
    const userCardsAfterToggle = screen.queryAllByRole("article");
    await userEvent.click(toggleButton);
    const userCardsAfterSecondToggle = screen.queryAllByRole("article");
    expect(
      userCardsAfterToggle.length === 3 &&
        userCardsAfterSecondToggle.length === 0
    ).toBe(true);
  });

  test("All users currently hidden appears when pressing the toggle button", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
    const toggleButton = screen.queryByRole("button");
    await userEvent.click(toggleButton);
    await userEvent.click(toggleButton);

    expect(screen.getByText("All users currently hidden")).toBeInTheDocument();
  });
});
