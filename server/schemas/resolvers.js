const { AuthenticationError } = require("apollo-server-express");
const { User, Comment, Chore } = require("../models");
const { signToken } = require("../utils/auth");

// NEED TO GET STRIPE NUMBER STILL
// const stripe = require("stripe")("");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("comments");
        return userData;
      }
      throw new AuthenticationError("You are not logged in.");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('comments')
        .populate('group')
    },
    // get all comments
    comments: async (parent, args, context) => {
      console.log(context.user.firstName);
      return Comment.find({ firstName: context.user.firstName }).sort({
        createdAt: -1,
      });
    },
    // get a comment by id
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },
    //  get all users
    users: async () => {
      return User.find()
        .select("__v -password")
        .populate("group")
        .populate("comments");
    },
    chores: async (parent, args, context) => {
      return Chore.find({ chore: context.choreBody }).sort({
        createdAt: -1,
      });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(email);

      if (!user) {
        throw new AuthenticationError("Incorrect credentials!");
      }
      const token = signToken(user);

      return { token, user };
    },

    addComment: async (parent, args, context) => {
      // return console.log( "firstName: ", context.user.firstName );

      if (context.user) {
        const comment = await Comment.create({
          ...args,
          firstName: context.user.firstName,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: comment._id } },
          { new: true }
        );
        return comment;
      }
      throw new AuthenticationError("You are not logged in.");
    },

    addChore: async (parent, args, context) => {
      // return console.log("chores: ", args.choreBody);

      if (context.user) {
        const chore = await Chore.create({
          ...args,
          choreBody: args.choreBody,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { chores: chore._id } },
          { new: true }
        );
        return chore;
      }
      // throw new AuthenticationError("You are not logged in");
    },

    addReaction: async (parent, { commentId, reactionBody }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findByIdAndUpdate(
          { _id: commentId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedComment;
      }
      throw new AuthenticationError("You are not logged in.");
    },

    createGroup: async (parent, args, context) => {
      const group = await group.create(args);
      const token = signToken(group);

      return group, token;
    },

    joinGroup: async(parent, { groupId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { group: groupId }},
          { new: true }
        ).populate('group');
        return updatedUser;
      }
      throw new AuthenticationError('You are not logged in.');
    },

    removeChore: async (parent, args, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { chores: { choreId: chore._id }}},
            { new: true }
          );
          return updatedUser;
        }
        throw new  AuthenticationError('You are not logged in.')
    }
  },
};

module.exports = resolvers;
