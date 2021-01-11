import React from "react";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import FirstPage from "./Components/FirstPage";
import UserRegistration from "./Containers/UserRegistration/UserRegistration";
import Questions from "./Containers/Questions/Questions";
import SummaryScreen from "./Containers/SummaryScreen";
import { isLogin } from "./Components/Utilities/Index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Switch>
            <Route
              exact
              path="/UserRegistration"
              component={UserRegistration}
            />
            <Route
              exact
              path="/"
              component={isLogin() ? FirstPage : UserRegistration}
            />
            <Route path="/Home" component={FirstPage} />
            <Route path="/Questions" component={Questions} />
            <Route path="/SummaryScreen" component={SummaryScreen} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
