const FileService = require('./FileService');

exports.findCenterWithMostSales = function () {
  const data = FileService.parseFile();
  let max = 0;
  let elementWithHighestSales;
  data.forEach(each => {
    if (each.totalSales > max) {
      elementWithHighestSales = each;
      max = each.totalSales;
    }
  });
  return elementWithHighestSales ? elementWithHighestSales : null;
};

exports.findStoreWithHighestPSM = function () {
  const data = FileService.parseFile();
  let maxPSM = 0;
  let elementWithHighestPSM;
  data.forEach(each => {
    const psm = each.totalSales / each.area;
    if (psm > maxPSM) {
      elementWithHighestPSM = each;
      maxPSM = psm;
    }
  });
  return elementWithHighestPSM ? elementWithHighestPSM : null;
};