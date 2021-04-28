import React, { Component } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Redirect } from "react-router";
import "./Navbar.css";

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
            <NavLink href="/" className="navlink">
              Sign in
            </NavLink>
            <NavLink href="/signup" className="navlink">
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
          style={{ border: "none", padding: "0" }}
          aria-controls="basic-navbar-nav"
        />
        <NavbarCollapse id="basic-navbar-nav">
          <p className="p">Welcome {localStorage.userEmail}</p>
          <Nav className="ml-auto">
            <NavLink href="/" className="navlink" onClick={this.logout}>
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
