const express = require('express');
const router = express.Router();
const promotionsController = require('../controllers/promotionsController');
router.post('/promos', promotionsController.createItemPromotion);
router.get('/viewpromos', promotionsController.getAllItemPromotions);
module.exports = router;