import { Component } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./hoc/PrivateRoute";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userAuth: false,
    };
    this.onUserAuth = this.onUserAuth.bind(this);
    this.afterUserLogout = this.afterUserLogout.bind(this);
  }

  componentDidMount() {
    if (localStorage.accessTokenSecret) {
      this.setState({ userAuth: true });
    }
  }

  onUserAuth() {
    this.setState({ userAuth: true });
  }

  afterUserLogout() {
    this.setState({ userAuth: false });
  }

  render() {
    return (
      <div>
        <NavBar
          isAuth={this.state.userAuth}
          userLogout={this.afterUserLogout}
        />
        <div className="App">
          <h1 style={{ margin: "20px", fontWeight: "900" }}>
            Github, Discord, API calls & me
          </h1>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <SignIn navbarChange={this.onUserAuth} />}
            />
            <PrivateRoute path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
