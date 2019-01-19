const { Expo } = require('expo-server-sdk');

function sendNotifiaction(somePushTokens, notice){

  let expo = new Expo();


  let messages = [];
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: pushToken,
      sound: 'default',
      body: notice.body,
      title: notice.title,
      // data: { withSome: 'data' },
    })
  }
}
var notice ={
  title = "hello",
  body = "test is add"
}
module.exports = {
  sendNotifiaction
};
