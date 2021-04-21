import React, { Component } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Redirect } from "react-router";

class NavBar extends Component {
  navbarBefore() {
    return (
      <Navbar bg="info" expand="md" className="shadow p-2 mb-4">
        <NavbarToggle
          aria-controls="basic-navbar-nav"
          style={{ border: "none", padding: "0" }}
        />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              href="/"
              className=""
              style={{ fontWeight: "800", margin: "0 10px" }}
            >
              Sign in
            </NavLink>
            <NavLink
              href="/signup"
              className=""
              style={{ fontWeight: "800", margin: "0 10px" }}
            >
              Sign up
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }

  navbarAfter() {
    return (
      <Navbar bg="info" expand="md" className="shadow p-2 mb-4">
        <NavbarToggle
          aria-controls="basic-navbar-nav"
          style={{ border: "none", padding: "0" }}
        />
        <NavbarCollapse id="basic-navbar-nav">
          <p style={{ margin: "7px" }}>Welcome {localStorage.userEmail}</p>
          <Nav className="ml-auto">
            <NavLink
              href="/"
              className=""
              onClick={this.logout}
              style={{ fontWeight: "800", margin: "0 10px" }}
            >
              Logout
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }

  logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("accessTokenSecret");
    this.props.userLogout();
    <Redirect to="/" />;
  }

  render() {
    return this.props.isAuth ? this.navbarAfter() : this.navbarBefore();
  }
}

export default NavBar;
