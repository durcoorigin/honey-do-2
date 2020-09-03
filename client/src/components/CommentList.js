import React from "react";
import { Container } from "semantic-ui-react";

export default function CommentList({ comments }) {
  return (
    <>
      <Container>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <p>
                {comment.firstName} commented on {comment.createdAt}
              </p>
              <p>"{comment.commentBody}"</p>
              {/* <Comment>
                <Comment.Actions>
                  <Comment.Action>
                    Reply
                    <Form>
                      <Form.TextArea />
                      <Button
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        primary
                      />
                    </Form>
                  </Comment.Action>
                </Comment.Actions>
              </Comment> */}
              <br></br>
            </div>
          ))}
      </Container>
    </>
  );
}
