
exports.parseFile = function () {
  const jsonFile = require('../../sales_data.json');
  return jsonFile ? jsonFile : [];
}