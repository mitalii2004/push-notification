var admin = require("firebase-admin");
var serviceAccount = require("./beky-63944-firebase-adminsdk-ha2jf-2887ed94a8.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//https://www.npmjs.com/package/firebase-admin 
module.exports = {
    sendFirebasePush: async function (deviceToken, bodyData, type) {
        bodyData.priority = "high";
        bodyData.sound = "default";
        bodyData.title = bodyData.message;
        const message = {
            token: deviceToken,
            notification: {
                title: bodyData.title,
                body: bodyData.message,
            },
            data: {
                ...bodyData,
                type: type
            },
            android: {
                priority: 'high'
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default'
                    }
                }
            }
        };
        admin.messaging().send(message)
            .then((response) => {
                console.log('Notification sent:', response);
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures:', failedTokens);
                }
            })
            .catch((error) => {
                console.error('Error sending notification:', error);
            });
    },
}