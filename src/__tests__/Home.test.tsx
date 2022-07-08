import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../Redux/store';
import { Auth, getAuth } from 'firebase/auth';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Sidebar from "../Components/Sidebar/Sidebar";
import Feed from "../Components/Feed";
import Widgets from '../Components/Widgets';
import Tweet from '../Components/Tweet';
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { act } from 'react-dom/test-utils';

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
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
       uid: "abc",
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

  expect(screen.getByTestId("name-1")).toHaveTextContent("example");
  expect(screen.getByTestId("username-1")).toHaveTextContent("@example");

  expect(screen.queryByTestId("followBtn-1")).not.toBeInTheDocument();
  expect(screen.getByTestId("MoreHorizIcon")).toBeInTheDocument();
 });
});

describe("Feed Component", () => {

 const setup = async () => {
  const mockAuth = ({
   currentUser: {
       uid: "abc",
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (collection as jest.Mock).mockReturnThis();
  (addDoc as jest.Mock).mockResolvedValue(this);

  const { container } = render(
   <Provider store={store}>
    <Router>
      <Feed name="example" photoUrl='example.png' username='example' />
    </Router>
   </Provider>
  );

  const promise = Promise.resolve();
  await act(async () => {
    await promise;
  });

  return {
    container
  };
 }

 it("renders the feed component", async () => {
  const { container } = await setup();
  expect(container).toMatchSnapshot();
 });

 it("types a tweet", async () => {
  await setup();

  fireEvent.change(screen.getByTestId("tweetBox"), {target: {value: "example tweet"}});

  expect(screen.getByTestId("tweetBox")).toHaveValue("example tweet");
 });

 
 it("sends a tweet", async () => {
  await setup();
  
  fireEvent.change(screen.getByTestId("tweetBox"), {target: {value: "example tweet"}});
  
  fireEvent.click(screen.getByTestId("tweetBtn"));

  await waitFor(() => {
    expect(addDoc).toBeCalled();
  });
  
 });

 
 it("renders and deletes the tweets", async () => {
  const tweets: any[] = [
     {
       name: "example",
       photoUrl: "example.png",
       tweet: "This is an example tweet.",
       username: "example",
       uid: "abc"
     },
     {
       name: "example2",
       photoUrl: "example2.png",
       tweet: "This is another example tweet.",
       username: "example2",
       uid: "abc2"
     }
  ];
   
  const mockAuth = ({
    currentUser: {
        uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (doc as jest.Mock).mockReturnThis();
  (deleteDoc as jest.Mock).mockResolvedValue(this);

  const Tweets = () => {
    return (
      <div>
        {tweets.map((tweet, index) => {
          return (
            <div key={index}>
              <Tweet 
                name={tweet.name}
                photoUrl={tweet.photoUrl}
                tweet={tweet.tweet}
                tweetId={`${index}`}
                username={tweet.username}
                uid={tweet.uid}
              />
            </div>
          );
        })}
      </div>
    );
  }

  render(<Tweets />);

  expect(screen.getByTestId("name-1")).toHaveTextContent("example2");
  expect(screen.getByTestId("username-0")).toHaveTextContent("@example");
  expect(screen.getByTestId("tweet-1")).toHaveTextContent("This is another example tweet.");

  fireEvent.click(screen.getByTestId("deleteBtn-0"));

  await waitFor(() => {
    expect(deleteDoc).toBeCalled();
  });

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

 it("displays the trend text", () => {
  render(
    <Router>
      <Widgets />
    </Router>
  );

  expect(screen.getByTestId("trendTopic-5")).toHaveTextContent("Science · Trending");
  expect(screen.getByTestId("trending-3")).toHaveTextContent("National Pizza Day");
  expect(screen.getByTestId("trendBody-1")).toHaveTextContent("Join the conversation to get your morning started in the right way.");
  expect(screen.getByTestId("trendFooter-2")).toHaveTextContent("1,452 Tweets");
  expect(screen.getByTestId("trendingWith-4")).toHaveTextContent("Trending with STILL WITH You, #PROOF_TRACKLIST3");
 });

 it("displays the suggested accounts", () => {
  render(
    <Router>
      <Widgets />
    </Router>
  );

  expect(screen.getByTestId("name-2")).toHaveTextContent("Burger King");
  expect(screen.getByTestId("username-3")).toHaveTextContent("@FiveGuys");
  expect(screen.getByTestId("followBtn-1")).toBeInTheDocument();
 });

 it("displays the terms text", () => {
  render(
    <Router>
      <Widgets />
    </Router>
  );

  expect(screen.getByTestId("policies")).toHaveTextContent("Terms of Service Privacy Policy Cookie Policy");
  expect(screen.getByTestId("moreTerms")).toHaveTextContent("Accessibility Ads info More");
  expect(screen.getByTestId("twitterInc")).toHaveTextContent("© 2022 Twitter, Inc.");
 });
});