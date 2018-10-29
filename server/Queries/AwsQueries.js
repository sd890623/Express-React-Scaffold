const AwsService = require('../Services/AwsService');

exports.startEc2Server = function (req, res) {
  AwsService.startEc2Server().then(data => {
    res.json({ status: 'OK' });
  }, err => {
    res.json({ error_msg: 'Something went wrong' });
  });
};

exports.stopEc2Server = function (req, res) {
  AwsService.stopEc2Server().then(data => {
    res.json({ status: 'OK' });
  }, err => {
    res.json({ error_msg: 'Something went wrong' });
  });
};

exports.serverStatus = function (req, res) {
  AwsService.findStatus().then(status => {
    res.json({ status });
  }, err => {
    res.json({ error_msg: 'Something went wrong' });
  });
};