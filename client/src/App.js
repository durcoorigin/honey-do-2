import ApolloClient from "apollo-boost";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
// import { Provider } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from './components/Homepage';
import Chores from "./pages/Chores";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup";
import MyGroup from "./pages/MyGroup";


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:3001/graphql",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <div className=""> */}
          {/* <Provider> */}
          <Header />
          <div className="">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/chores" component={Chores} />
              <Route exact path="/creategroup" component={CreateGroup} />
              <Route exact path="/mygroup" component={MyGroup} />
            </Switch>
          </div>
          <Footer />
          {/* </Provider> */}
        {/* </div> */}
      </Router>
    </ApolloProvider>
  );
}