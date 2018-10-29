exports.startEc2Server = () => new Promise((resolve, reject) => {
  var AWS = require('aws-sdk');
  AWS.config.update({region: 'ap-southeast-2'});


  var ec2 = new AWS.EC2();

  var params = {
    InstanceIds: [
      "i-04da697d5ea5e1372"
    ]
  };

  ec2.startInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(error);
    } // an error occurred
    else  {
      console.log(data);
      resolve(data);
    }           // successful response
    /*
     data = {
     StartingInstances: [
     {
     CurrentState: {
     Code: 0,
     Name: "pending"
     },
     InstanceId: "i-1234567890abcdef0",
     PreviousState: {
     Code: 80,
     Name: "stopped"
     }
     }
     ]
     }
     */
  });
});

exports.stopEc2Server = () => new Promise((resolve, reject) => {

  var AWS = require('aws-sdk');
  AWS.config.update({region: 'ap-southeast-2'});

  var ec2 = new AWS.EC2();

  var params = {
    InstanceIds: [
      "i-04da697d5ea5e1372"
    ]
  };
  ec2.stopInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } // an error occurred
    else  {
      console.log(data);
      resolve(data);
    }           // successful response
    /*
     data = {
     StartingInstances: [
     {
     CurrentState: {
     Code: 0,
     Name: "pending"
     },
     InstanceId: "i-1234567890abcdef0",
     PreviousState: {
     Code: 80,
     Name: "stopped"
     }
     }
     ]
     }
     */
  });
});

exports.findStatus = () => new Promise((resolve, reject) => {

  var AWS = require('aws-sdk');
  AWS.config.update({region: 'ap-southeast-2'});


  var ec2 = new AWS.EC2();

  var params = {
    InstanceIds: [
      "i-04da697d5ea5e1372"
    ]
  };
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err)
    } // an error occurred
    else  {
      const status = data.Reservations[0].Instances[0] ? data.Reservations[0].Instances[0].State.Name : '';
      console.log(status);
      resolve(status);
    }           // successful response
    /*
     data = {
     StartingInstances: [
     {
     CurrentState: {
     Code: 0,
     Name: "pending"
     },
     InstanceId: "i-1234567890abcdef0",
     PreviousState: {
     Code: 80,
     Name: "stopped"
     }
     }
     ]
     }
     */
  });
});
