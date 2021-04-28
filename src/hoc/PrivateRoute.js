import React from "react";
import { Route } from "react-router";
import Home from "../components/Home";
import MainAuth from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      MainAuth.isAuth ? (
        <Component {...props} />
      ) : localStorage.accessTokenSecret ? (
        localStorage.getItem("accessTokenSecret") && <Home />
      ) : (
        <p style={{ fontSize: "35px", fontWeight: "900" }}>
          404 <br /> Page not found
        </p>
      )
    }
  />
);

export default PrivateRoute;
