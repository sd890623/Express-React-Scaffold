const StoreService = require('../Services/StoreService');

exports.findStoreWithMostSales = function (req, res) {
  const store = StoreService.findCenterWithMostSales();
  if (store) {
    res.json({ store });
  } else {
    res.json({ error_msg: 'No store is found' });
  }
};
exports.findStoreWithHighestPSM = function (req, res) {
  const store = StoreService.findStoreWithHighestPSM();
  if (store) {
    res.json({ store });
  } else {
    res.json({ error_msg: 'No store is found' });
  }
};