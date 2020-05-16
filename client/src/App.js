import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

function App() {
    return (
        <Router>
            <div className="App">
                {/* Build a PrivateRoute component that will display BubblePage when you're authenticated */}
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Login} />
                    <PrivateRoute
                        exact
                        path="/bubbles"
                        component={BubblePage}
                    />
                    {/* <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} logged={loggedIn} />
                        )}
                    />
                    <PrivateRoute exact path="/friends" component={Friends} />
                    <PrivateRoute exact path="/add" component={AddFriend} />
                    <PrivateRoute
                        exact
                        path="/edit/:id"
                        component={EditFriend} */}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
