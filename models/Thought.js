// Require Mongoose and Moment
const { Schema, model, Types } = require("mongoose");

// Build for ReactionSchema
const ReactionSchema = new Schema(
  {
    // Custom ID
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

// ThoughtSchema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    username: {
      ref: "User",
      type: String,
      required: true,
    },
    // ReactionSchema is used to validate data
    reactions: [ReactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
      getters: true,
    },
    id: false,
  }
);
// To get the total amount of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Thought model is created using the Thought Schema
const Thought = model("Thought", ThoughtSchema);

// Export Thought Model
module.exports = Thought;
