const SalesService = require('../Services/SalesService');

exports.getAll = function (req, res) {
  const figures = SalesService.getTotalSales();
  res.json({ sales: figures });
};
exports.getByCenter = function (req, res) {
  const figures = SalesService.getTotalSalesByCenter('Chadstone');
  res.json({ sales: figures });
};
exports.getByState = function (req, res) {
  const figures = SalesService.getTotalSalesByState('VIC');
  res.json({ sales: figures });
};