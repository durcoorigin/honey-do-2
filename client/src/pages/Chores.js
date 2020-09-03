import React from "react";
import { QUERY_COMMENTS, QUERY_ALL_CHORES } from "../utils/queries";
// import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import AddChoreForm from "../components/AddChoreForm";
import ChoreList from "../components/ChoreList";

export default function Chores(props) {
  // get comment data
  const { data } = useQuery(QUERY_COMMENTS);
  const comments = data?.comments || [];
  console.log("Comments: ", comments);

  // get chore data
  // const { chore: choreBody } = useParams();
  // const { choreData } = useQuery(QUERY_ALL_CHORES, {
  //   fetchPolicy: "network-only",
  //   variables: { chore: choreBody }
  // });
  const { choreData } = useQuery(QUERY_ALL_CHORES);
  const chores = choreData?.chores.choreBody || [];
  console.log("Chores: ", chores);

  return (
    <>
      <body
        style={{
          background: "lightblue",
          height: "1000px",
        }}
      >
        <ChoreList chores={chores} />
        <br></br>
        <AddChoreForm />
        <CommentList comments={comments} />
        <CommentForm />
      </body>
    </>
  );
}
