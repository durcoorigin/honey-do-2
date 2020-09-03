import React from "react";
import {
  Form,
  Checkbox,
  List,
  Container,
  Icon,
  Button,
} from "semantic-ui-react";
import { REMOVE_CHORE } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { removeChoreId } from "../utils/localStorage";
import { QUERY_ME } from "../utils/queries";

export default function ChoreList({ chores }) {
  const [removeChore, { error }] = useMutation(REMOVE_CHORE);
  // const { data } = useQuery(QUERY_ME);
  // const userData = data?.me || {};

  const handleRemoveChore = async (choreId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeChore({
        variables: { choreId },
      });

      console.log(data);

      if (error) {
        throw new Error("Cannot delete chore.");
      }

      // upon success, remove chore from localStorage
      removeChoreId(choreId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container style={{ margin: "15px" }}>
        {chores &&
          chores.map((chore) => (
            <div key={chore._id}>
              <Form>
                <Form.Field>
                  <List>
                    <List.Item>
                      <List.Content>
                        <ul style={{ listStyle: "none", display: "block" }}>
                          <li style={{ margin: "0 0 5px 0" }}>
                            {/* {chore.choreBody} */}
                            <Checkbox label={chore.choreBody} />
                            <Button
                              onClick={() => handleRemoveChore(chore.choreId)}
                            >
                              <Icon name="trash" />
                            </Button>
                          </li>
                        </ul>
                      </List.Content>
                    </List.Item>
                  </List>
                </Form.Field>
              </Form>
            </div>
          ))}
      </Container>
    </>
  );
}
