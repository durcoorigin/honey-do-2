import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "semantic-ui-css/semantic.min.css";
import { Form, Input, Button, Container } from "semantic-ui-react";

export default function Signup(props) {
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <body
    style={{
      background: "yellow",
      height: "800px",
    }}>
    <Container text textAlign="center">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h2
      style={{
        color: "teal",
        marginTop: '1.5em',
        marginBottom: '2em',
        fontSize: '1.7em',
      }}
      >Signup</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field
          placeholder="First Name"
          control={Input}
          label="First Name"
          id="form-input-control-first-name"
          onChange={handleChange}
          autoComplete="on"
          name="firstName"
        />
        <Form.Field
          placeholder="Last Name"
          control={Input}
          label="Last Name"
          id="form-input-control-last-name"
          onChange={handleChange}
          autoComplete="on"
          name="lastName"
        />
        <Form.Field
          placeholder="Username"
          label="Username"
          control={Input}
          id="Username"
          onChange={handleChange}
          autoComplete="on"
          name="username"
        />
        <Form.Field
          placeholder="youremail@test.com"
          control={Input}
          label="Email"
          id="form-input-control-error-email"
          onChange={handleChange}
          autoComplete="on"
          name="email"
        />
        <Form.Field
          placeholder="must be at least 6 characters"
          label="Password"
          control={Input}
          id="Password"
          onChange={handleChange}
          autoComplete="on"
          type="password"
          name="password"
        />
        <Button
          type="submit"          
          color="teal"
          size="big"
          style={{
            marginBottom: "10em",
          }}
        >
          Signup
        </Button>
      </Form>
      {error && <div>Sign up failed.</div>}
    </Container>
    </body>
  );
}
