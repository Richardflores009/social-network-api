const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
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
    return this.friends.length;
  });

  // create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);
// User.remove({}, function(err) { 
//   console.log('collection removed') 
// });

// export the Pizza model
module.exports = User;
