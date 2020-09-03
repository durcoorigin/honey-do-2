import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT } from "../utils/mutations";
import { QUERY_COMMENTS, QUERY_ME } from "../utils/queries";
import { Container, Form, Button, Grid } from "semantic-ui-react";

export default function CommentForm(props) {
  const [commentBody, setBody] = useState("");
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [addComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }

      // append new comment to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, comments: [...me.comments, addComment] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add comment to database
      await addComment({
        variables: { commentBody },
      });

      // clear form value
      setBody("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <body
      style={{
        background: "lightblue",
        height: "175px",
      }}
    >
      <Container>
        <Grid columns={2} text textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={handleFormSubmit}>
                <Form.TextArea
                  onChange={(event) => setBody(event.target.value)}
                />
                <Button
                  color="teal"
                  size="medium"
                  style={{
                    marginBottom: "4em",
                    fontFamily: "-moz-initial",
                  }}
                >
                  Comment
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </body>
  );
}
