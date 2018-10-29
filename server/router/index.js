const express = require('express');
const path = require('path');
const FindTotalSales = require('../Queries/FindTotalSales');
const FindCenter = require('../Queries/FindCenter');
const AwsQueries = require('../Queries/AwsQueries');

const router = express.Router();

router.get('/hello', (req, res, next) => res.json({ msg: 'Vicinity Center'}));
router.get('/findTotalSales', FindTotalSales.findAll);
router.get('/findTotalSalesByCenter', FindTotalSales.findByCenter);
router.get('/findTotalSalesByState', FindTotalSales.findByState);
router.get('/findStoreHighSales', FindCenter.findStoreWithMostSales);
router.get('/findStoreHighPSM', FindCenter.findStoreWithHighestPSM);
router.get('/startServer', AwsQueries.startEc2Server);
router.get('/stopServer', AwsQueries.stopEc2Server);
router.get('/serverStatus', AwsQueries.serverStatus)

module.exports = router;
