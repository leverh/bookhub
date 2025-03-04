import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("Should render NavBar with Sign in link when user is not logged in", () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signInLink = screen.getByText(/Sign in/i);
  expect(signInLink).toBeInTheDocument();
});

test("Should render NavBar with Sign up link when user is not logged in", () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signUpLink = screen.getByText(/Sign up/i);
  expect(signUpLink).toBeInTheDocument();
});

test("Should render Profile link when user is logged in", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileLink = await screen.findByText("Profile");
  expect(profileLink).toBeInTheDocument();
});

test("Should render Sign in and Sign up links after user logs out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByText(/Sign out/i);
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByText(/Sign in/i);
  expect(signInLink).toBeInTheDocument();

  const signUpLink = await screen.findByText(/Sign up/i);
  expect(signUpLink).toBeInTheDocument();
});
