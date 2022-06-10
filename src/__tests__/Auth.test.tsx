import React from "react";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Login Page", () => {

 it("renders login page", () => {
  const { container } = render(
   <Router>
    <LoginPage />
   </Router>
  );
  expect(container).toMatchSnapshot();
 });

 it("changes login values", () => {
  render(
   <Router>
    <LoginPage />
   </Router>
  );

  const emailInput = screen.getByTestId("Email");
  const passwordInput = screen.getByTestId("Password");

  fireEvent.change(emailInput, {target: {value: "example@example.com"}});
  fireEvent.change(passwordInput, {target: {value: "example"}});

  expect(emailInput).toHaveValue("example@example.com");
  expect(passwordInput).toHaveValue("example");
 });

 it("should login user", async () => {
  const mockAuth = ({
   signInWithEmailAndPassword: jest.fn(),
  } as unknown) as Auth;
  (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValue(mockAuth);

  const email = "example@example.com";
  const password = "example";

  const Login = () => {
    return (
      <div>
        <button data-testid="loginBtn" onClick={() => loginUser()}></button>
      </div>
    );
  }

  const loginUser = async () => await signInWithEmailAndPassword(getAuth(), email, password);

  render(<Login />);

  const loginBtn = screen.getByTestId("loginBtn");
  fireEvent.click(loginBtn);

  expect(getAuth).toBeCalledTimes(1);
 });

 it('navigates to register page', async () => {
  render(
   <Router>
    <LoginPage />
    <RegisterPage />
   </Router>
  );

  userEvent.click(screen.getByTestId('register-link'));

  await waitFor(() => {
   expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });
 });

});

describe("Register Page", () => {

 it("renders register page", () => {
  const { container } = render(
   <Router>
    <RegisterPage />
   </Router>
  );
  expect(container).toMatchSnapshot();
 });

 it("changes sign up values", () => {
  render(
   <Router>
    <RegisterPage />
   </Router>
  );

  fireEvent.change(screen.getByTestId("Name"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("Email"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("Password"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("confirmPassword"), {target: {value: "example"}});

  expect(screen.getByTestId("Name")).toHaveValue("example");
  expect(screen.getByTestId("Email")).toHaveValue("example@example.com");
  expect(screen.getByTestId("Password")).toHaveValue("example");
  expect(screen.getByTestId("confirmPassword")).toHaveValue("example");
 });

 it("changes username and photo values", () => {
  render(
   <Router>
    <RegisterPage />
   </Router>
  );

  fireEvent.change(screen.getByTestId("Name"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("Email"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("Password"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("confirmPassword"), {target: {value: "example"}});

  fireEvent.click(screen.getByTestId("userAndPhotoBtn"));

  fireEvent.change(screen.getByTestId("Username"), {target: {value: "example"}});

  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(['example'], 'example.png', { type: 'image/png' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });

  expect(screen.getByTestId("Username")).toHaveValue("example");
  expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId("imgFileErr")).not.toBeInTheDocument();
 });

 it("shows img file error message", () => {
  render(
   <Router>
    <RegisterPage />
   </Router>
  );

  fireEvent.change(screen.getByTestId("Name"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("Email"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("Password"), {target: {value: "example"}});
  fireEvent.change(screen.getByTestId("confirmPassword"), {target: {value: "example"}});

  fireEvent.click(screen.getByTestId("userAndPhotoBtn"));

  const fakeFile = new File(['example'], 'example.xml', { type: 'image/xml' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });

  expect(screen.getByTestId("imgFileErr")).toBeInTheDocument();
  expect(screen.getByTestId("imgFileErr")).toHaveTextContent("Please choose an image file (png or jpeg)");
 });

 it("should register user", async () => {
  const mockAuth = ({
   createUserWithEmailAndPassword: jest.fn(),
  } as unknown) as Auth;
  (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValue(mockAuth);

  const email = "example@example.com";
  const password = "example";

  const Register = () => {
    return (
      <div>
        <button data-testid="registerBtn" onClick={() => registerUser()}></button>
      </div>
    );
  }

  const registerUser = async () => await createUserWithEmailAndPassword(getAuth(), email, password);

  render(<Register />);

  const registerBtn = screen.getByTestId("registerBtn");
  fireEvent.click(registerBtn);

  expect(getAuth).toBeCalledTimes(1);
 });

 it('navigates to login page', async () => {
  render(
   <Router>
    <RegisterPage />
    <LoginPage />
   </Router>
  );

  userEvent.click(screen.getByTestId('login-link'));

  await waitFor(() => {
   expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });
 });

});