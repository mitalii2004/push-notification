var apn = require('apn');
// https://www.npmjs.com/package/apn
module.exports={
    sendPushToIosRefund: async function (notification_data) {
        try {
          var options = {
            to: notification_data.deviceToken,
            token: {
              key: __dirname + "/AuthKey_NTJN5S7MKD.p8",
              keyId: "NTJN5S7MKD",
              teamId: "7YFZ5ZND5Z",
            },
            production: false,
          };    
          let notification = {
            message: notification_data.message,
            type: notification_data.deviceType == "IOS" ? 2 : 1,
            notificationType: 3,
            senderId: notification_data.senderId,
            senderName: notification_data.senderName,
            senderProfile: notification_data.senderProfile,
            receiverId: notification_data.receiverId,
          };
          var apnProvider = new apn.Provider(options);
          var note = new apn.Notification();
    
          note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
          note.badge = 3;
          note.sound = "ping.aiff";
          note.alert = notification_data.message;
          note.aps.alert = notification_data.message;
          note.payload = { body: notification };
          note.topic = "com.AutoCheckPro.Dev";
          (note.senderId = notification_data.senderId),
            (note.receiverId = notification_data.receiverId),
            console.log(note, "---note--");
         try {
          const status = await apnProvider.send(
            note,
            notification_data.deviceToken
          );
          console.log("status", status);
          return status;
         } catch (error) {
          throw error
         }
        } catch (error) {
          console.log("Inside catch in send push to IOS in helper--->", error);
        }
      },
}