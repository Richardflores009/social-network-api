const { Thought, User } = require('../models');

const thoughtController = {
  getAllthought(req, res) {
    Thought.find({})
  .select('-__v')
  .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},
// get one pizza by id
getThoughtById({ params }, res) {
  Thought.findOne({ _id: params.id })
.select('-__v')
  .then(dbUserData => {
    // If no pizza is found, send 404
    if (!dbUserData) {
      res.status(404).json({ message: 'No pizza found with this id!' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
},

// add comment to pizza
addThought({ params, body }, res) {
    console.log('yoyoyo', body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // add reply
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reaction: body } },
      { new: true, runValidators: true  }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
  removeThought({ params}, res) {
    console.log('yoyoyo', params);
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: id },
          { $pull: { thought: params.id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove reply
removeReaction({ params}, res) {
  console.log('parameter', params);
    Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reaction: { _id: params.reactionId }  } },
    { new: true }
  )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
  
};

module.exports = thoughtController;