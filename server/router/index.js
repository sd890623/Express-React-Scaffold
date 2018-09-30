const express = require('express');
const path = require('path');
const GetTotalSalesByCenter = require('../Queries/GetTotalSales');
const router = express.Router();

router.get('/hello', (req, res, next) => res.send({ msg: 'Vicinity Center'}));
router.get('/getTotalSales', GetTotalSalesByCenter.getAll);
router.get('/getTotalSalesByCenter', GetTotalSalesByCenter.getByCenter);
router.get('/getTotalSalesByState', GetTotalSalesByCenter.getByState);

module.exports = router;
