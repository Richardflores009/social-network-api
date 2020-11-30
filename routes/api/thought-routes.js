const router = require('express').Router();
const {
    
  } = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post();

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').put().delete();

router.route('/:pizzaId/:commentId/:replyId').delete();

module.exports = router;