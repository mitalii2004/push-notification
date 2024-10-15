var FCM = require('fcm-node');
var serverKey = 'YOURSERVERKEYHERE'; //put your server key here
var fcm = new FCM(serverKey);
// https://www.npmjs.com/package/fcm-node
module.exports={
    sendPushFCM: async function (payLoad) {
        try {
          if (payLoad && payLoad.deviceToken && payLoad.deviceToken != "") {
            var message = {
              to: payLoad.deviceToken,
              notification: {
                title: "TTWEJ",
                body: payLoad.message,
                content_available: true,
                priority: "high",
                notificationType: 2,
                sender_name: payLoad?.senderName,
                senderProfile: payLoad?.senderProfile,
                receiverId: payLoad?.receiverId,
              },
    
              data: {
                title: "TTWEJ",
                body: payLoad.message,
                content_available: true,
                priority: "high",
                notificationType: 2,
                sender_name: payLoad?.senderName,
                senderProfile: payLoad?.senderProfile,
                receiverId: payLoad?.receiverId,
              },
            };
            fcm.send(message, function (err, response) {
              if (err) {
                console.log("Something has gone wrong!", err);
              } else {
                console.log("Successfully sent with response: ", response);
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
}