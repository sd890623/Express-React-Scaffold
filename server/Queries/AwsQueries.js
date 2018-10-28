const AwsService = require('../Services/AwsService');

exports.startEc2Server = function (req, res) {
  const result = AwsService.startEc2Server();
  if (result) {
    res.json({ status: 'OK' });
  } else {
    res.json({ error_msg: 'Something went wrong' });
  }
};
