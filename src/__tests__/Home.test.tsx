import React, { useState } from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
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
import Tweet from '../Components/Tweet';

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

 it("types a tweet", () => {

  render(
   <Router>
    <Feed name="example" photoUrl='example.png' username='example' />
   </Router>
  );

  fireEvent.change(screen.getByTestId("tweetBox"), {target: {value: "example tweet"}});

  expect(screen.getByTestId("tweetBox")).toHaveValue("example tweet");
 });

 let tweetIndex: number = 0;
 let tweets: any[] = [];

 it("sends a tweet", () => {

  const TestFeed = () => {

    const [tweet, setTweet] = useState<string>('');
    const sendTweet = (tweet: string) => {
      const tweetDoc = {
        name: 'example',
        photoUrl: 'example.png',
        tweet,
        tweetIndex,
        uid: "abc",
        username: 'example'
      };
      tweets.push(tweetDoc);
      tweetIndex++;
    }

    return (
      <div>
         <textarea data-testid="tweetBox" value={tweet} onChange={e => setTweet(e.target.value)} />
         <button data-testid="tweetBtn" onClick={() => sendTweet(tweet)}></button>
      </div>
    );
  }

  render(<TestFeed />);

  fireEvent.change(screen.getByTestId("tweetBox"), {target: {value: "example tweet 0"}});

  fireEvent.click(screen.getByTestId("tweetBtn"));

  expect(tweets).toHaveLength(1);

  fireEvent.change(screen.getByTestId("tweetBox"), {target: {value: "example tweet 1"}});

  fireEvent.click(screen.getByTestId("tweetBtn"));

  expect(tweets).toHaveLength(2);
 });

 it("renders and deletes the tweets", () => {

  const mockAuth = ({
    currentUser: {
        uid: jest.fn().mockReturnValue("abc"),
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);

  const Tweets = () => {

    const deleteTweet = (index: number) => tweets.filter(_tweet => _tweet.tweetIndex !== index);
    return (
      <div>
        {tweets.map((tweet) => {
          return (
            <div key={tweet.tweetIndex}>
              <Tweet 
                name={tweet.name}
                photoUrl={tweet.photoUrl}
                tweet={tweet.tweet}
                tweetId={`${tweet.tweetIndex}`}
                username={tweet.username}
                uid={tweet.uid}
              />
              <button data-testid={`deleteBtn-${tweet.tweetIndex}`} onClick={() => deleteTweet(tweet.tweetIndex)}></button>
            </div>
          );
        })}
      </div>
    );
  }

  render(<Tweets />);

  expect(screen.getByTestId("name-1")).toHaveTextContent("example");
  expect(screen.getByTestId("username-0")).toHaveTextContent("@example");
  expect(screen.getByTestId("tweet-1")).toHaveTextContent("example tweet 1");

  fireEvent.click(screen.getByTestId("deleteBtn-0"));
  expect(tweets).toHaveLength(1);
  expect(screen.queryByTestId("tweet-0")).not.toBeInTheDocument();
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