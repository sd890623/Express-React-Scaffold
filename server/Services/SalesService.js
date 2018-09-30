const FileService = require('./FileService');

exports.getTotalSales = function () {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    totalSales += each.totalSales;
  });
  return totalSales;
};

exports.getTotalSalesByCenter = function (center) {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    if (each.centre === center) {
      totalSales += each.totalSales;
    }
  });
  return totalSales;
};

exports.getTotalSalesByState = function (state) {
  const data = FileService.parseFile();
  let totalSales = 0;
  data.forEach(each => {
    if (each.state === state) {
      totalSales += each.totalSales;
    }
  });
  return totalSales;
};