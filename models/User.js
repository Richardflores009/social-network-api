const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
      type: String,
      required:true,
      trim: true,
       unique: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
    thought: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [this]
  },
  
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

  // get total count of comments and replies on retrieval
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
  });

  // create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;
