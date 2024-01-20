const express = require('express');
const router = express.Router();
const reserveController = require('../controllers/reserveController');
router.post('/reserve', reserveController.reserveTable);
router.get('/reserved', reserveController.getAllReservedTables);
module.exports = router;