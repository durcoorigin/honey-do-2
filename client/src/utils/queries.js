import gql from "graphql-tag";

export const QUERY_COMMENTS = gql`
  query comments {
    comments {
      _id
      commentBody
      createdAt
      firstName
    }
  }
`;

export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      commentBody
      createdAt
      username
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_ALL_CHORES = gql`
  query chores {
    chores {
      _id
      choreBody
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      username
      email
      tasks {
        _id
        taskName
      }
      comments {
        _id
        commentBody
      }
    }
  }
`;

export const QUERY_GROUP = gql`
  query group {
    group {
      _id
      groupName
      groupPassword
    }
}`

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      comments {
        _id
        commentBody
        createdAt
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      chores {
        _id
        choreBody
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;
