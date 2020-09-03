const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments: [Comment]
    comment(_id: ID!): Comment
    chores: [Chore]
    chore(_id: ID!): Chore
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addComment(commentBody: String!): Comment
    addReaction(commentId: ID!, reactionBody: String!): Comment
    joinGroup(groupId: ID!, groupName: String!): Group
    createGroup(groupId: ID!, groupName: String!): Group
    addChore(choreBody: String!): Chore
    removeChore(choreBody: String!): Chore
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    chores: [Chore]
    comments: [Comment]
    group: [Group]
  }

  type Group {
    id: ID!
    groupName: String!
    groupPassword: String
    users: [User]
  }

  type Chore {
    _id: ID
    choreBody: String
    user: [User]
  }

  type Comment {
    _id: ID
    commentBody: String
    user: [User]
    createdAt: String
    firstName: String
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
`;

module.exports = typeDefs;
