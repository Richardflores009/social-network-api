const { Thought, User } = require('../models');

const thoughtController = {
// add comment to pizza
addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
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
  // add reply
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
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
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thought: params.thoughtId } },
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
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reaction: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
  
};

module.exports = thoughtController;