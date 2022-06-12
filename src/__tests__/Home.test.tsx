import React from 'react';
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "../Pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../Redux/store';
import { Auth, getAuth } from 'firebase/auth';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Sidebar from "../Components/Sidebar/Sidebar";
import Feed from "../Components/Feed";
import Widgets from '../Components/Widgets';

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"],
  };
});

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn()
  };
});

jest.mock('firebase/firestore');

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Sidebar Component", () => {
 
 const mockStore = configureMockStore([thunk]);

 const store = mockStore({
    user: {
     user: {
      name: "example",
      photoUrl: "example.png",
      username: "example"
     }
    }
 });
 const setup = () => {

  const mockAuth = ({
   currentUser: {
       uid: jest.fn().mockReturnValue("abc"),
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
 
  render(
   <Provider store={store}>
    <Router>
     <Sidebar />
    </Router>
   </Provider>
  );

 }

 it("renders the sidebar component", () => {

   setup();
   const { container } = render(
    <Provider store={store}>
     <Router>
      <Sidebar />
     </Router>
    </Provider>
   );

   expect(container).toMatchSnapshot();
 });

 it("has the user's attributes", () => {

  setup();

  expect(screen.getByTestId("name")).toHaveTextContent("example");
  expect(screen.getByTestId("username")).toHaveTextContent("@example");

  expect(screen.queryByTestId("followBtn")).not.toBeInTheDocument();
  expect(screen.getByTestId("MoreHorizIcon")).toBeInTheDocument();
 });
});

describe("Feed Component", () => {

 it("renders the feed component", () => {

  const { container } = render(
   <Router>
    <Feed name="example" photoUrl='example.png' username='example' />
   </Router>
  );

  expect(container).toMatchSnapshot();
 });
});

describe("Widgets Component", () => {

 it("renders the widgets component", () => {

  const { container } = render(
   <Router>
    <Widgets />
   </Router>
  );

  expect(container).toMatchSnapshot();
 });
});