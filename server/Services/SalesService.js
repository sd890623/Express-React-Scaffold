const FileService = require('./FileService');

exports.findTotalSales = function () {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    totalSales += each.totalSales;
  });
  return totalSales;
};

exports.findTotalSalesByCenter = function (center) {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    if (each.centre === center) {
      totalSales += each.totalSales;
    }
  });
  return totalSales;
};

exports.findTotalSalesByState = function (state) {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    if (each.state === state) {
      totalSales += each.totalSales;
    }
  });
  return totalSales;
};