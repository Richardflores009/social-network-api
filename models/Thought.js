const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      trim:true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
  },
  {
      toJSON: {
        getters: true
      }
    }
);

const ThoughtSchema = new Schema({
    username: {
    type: String,
    required: true,
    trim: true
  },
  thoughtText: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // use ReplySchema to validate data for a reply
  reaction: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


  
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;