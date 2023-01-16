const { Schema, model } = require("mongoose");
//const moment = require('moment');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// To get the total amount of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// User model is created using the Users Schema
const User = model("Users", UserSchema);

//Exports the User model
module.exports = User;
