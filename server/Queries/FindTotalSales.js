const SalesService = require('../Services/SalesService');

exports.findAll = function (req, res) {
  const figures = SalesService.findTotalSales();
  res.json({ sales: figures });
};
exports.findByCenter = function (req, res) {
  const figures = SalesService.findTotalSalesByCenter(req.query.center);
  res.json({ sales: figures });
};
exports.findByState = function (req, res) {
  const figures = SalesService.findTotalSalesByState(req.query.state);
  res.json({ sales: figures });
};