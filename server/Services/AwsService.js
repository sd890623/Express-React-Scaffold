exports.startEc2Server = function () {

  var AWS = require('aws-sdk');

  var ec2 = new AWS.ec2();

  var params = {
    InstanceIds: [
      "i-04da697d5ea5e1372"
    ]
  };
  ec2.startInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return false;
    } // an error occurred
    else  {
      console.log(data);
      return true;
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
};
