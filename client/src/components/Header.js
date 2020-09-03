import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Menu, Image, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function Header() {
  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <Sticky>
          <Menu
            style={{
              backgroundColor: "yellow",
            }}
          >
            <Container>
              <Menu.Item as="a" header>
              <Link to="/">
                <h1
                  style={{
                    color: "teal",
                    fontFamily: "-moz-initial"
                  }}
                >
                  Honey Do List
                </h1>
              </Link>
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as="a" name="Tasks">
                  <Image src="https://img.icons8.com/cute-clipart/64/000000/task.png" />
                  <Link to="/chores"
                    style={{
                      color: "teal",
                      fontFamily: "-moz-initial"
                    }}
                  >Chores</Link>
                </Menu.Item>
                <Menu.Item as="a" name="Shopping">
                  <Image src="https://img.icons8.com/color/48/000000/shopping-cart-loaded.png" />
                  <Link to="/"
                    style={{
                      color: "teal",
                      fontFamily: "-moz-initial"
                    }}
                  >Shopping</Link>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Sticky>
      );
    } 
  }

  return (
    <>
      {showNav()}
    </>
  );
}