var auth = require("./auth.json");
var emojify = require("./emojify");
var Twitter = require("twitter");

var client = new Twitter(auth);

// client.post("statuses/update", { status: "Testing Twitter bot for NICAR, don't mind me." }, function(err, tweet, response) {
//   console.log(tweet, response);
// });

var test = `
You hear the door slam and realize there's nowhere left to run
You feel the cold hand and wonder if you'll ever see the sun
You close your eyes and hope that this is just imagination
But all the while you hear a creature creepin' up behind
You're out of time
`;

console.log(test.split(/\b/g).map(emojify).join(""));