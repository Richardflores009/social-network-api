const router = require('express').Router();
const {getAllthought,getThoughtById, addThought, addReaction, removeThought, removeReaction} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/').get(getAllthought).post(addThought);

router.route('/:id').get(getThoughtById).delete(removeThought).put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;