import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { CREATE_GROUP } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Button, Grid, Form, Input, Label } from "semantic-ui-react";

export default function CreateGroup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [createGroup] = useMutation(CREATE_GROUP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await createGroup({
      variables: {
        groupName: formState.groupName,
        password: formState.groupPassword,
      },
    });
    const token = mutationResponse.data.createGroup.token;
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
    <>
      <body
        style={{
          background: "lightblue",
          height: "700px",
        }}
      >
        <Container style={{ marginBottom: "2em" }} text textAlign="center">
          <h2
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              marginBottom: "1em",
              marginTop: "2em",
              color: "yellow",
              fontFamily: "-moz-initial",
            }}
          >
            Search For My Group
          </h2>
          <Grid columns={1} text textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Input
                    icon="search"
                    placeholder="Smith Family"
                    type="text"
                    onChange={handleChange}
                    name="groupName"
                  />
                  <Label pointing="left">Type in your group name</Label>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Input
                    type="password"
                    placeholder="Group Password"
                    name="password"
                    autocomplete="on"
                  />
                  <Label pointing="left">Group Password</Label>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Link to="/chores">
                    <Button.Group widths={1}>
                      <Button
                        color="teal"
                        size="huge"
                        style={{
                          marginBottom: "4em",
                          fontFamily: "-moz-initial",
                        }}
                        onClick={handleFormSubmit}
                      >
                        Submit
                      </Button>
                    </Button.Group>
                  </Link>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </body>
    </>
  );
}
