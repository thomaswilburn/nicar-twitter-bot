var emojify = require("./emojify");
var twitter = require("./tweets");

var getMyID = function() {
  console.log("Getting user ID...");
  twitter.getUserID("thomaswilburn", function(err, id) {
    if (err) return console.log("Couldn't get user ID", err);
    getMyFollowers(id);
  });
}

var getMyFollowers = function(id) {
  console.log("Got ID:", id);
  console.log("Getting followers...");
  twitter.getFollowerIDs(id, function(err, followers) {
    if (err) return console.log("Couldn't get followers", err);
    streamMyFollowers(followers);
  });
};

var streamMyFollowers = function(followers) {
  console.log(`Got ${followers.length} followers`);
  console.log("Connecting to stream...");
  twitter.client.stream("statuses/filter", { follow: followers.join() }, function(stream) {
    console.log("Ready to emojify!");
    stream.on("data", onTweet);
    stream.on("error", e => console.log("Stream error:", e));
    stream.on("end", e => console.log("Stream ended:", e));
  });
};

var onTweet = function(tweet) {
  //The stream won't apply keyword search to followers, so filter here instead
  if (!tweet.text.match(/emojify/)) return;
  var username = tweet.user.screen_name;
  var tweetID = tweet.id_str;
  var emojified = tweet.text.split(/\b/).map(emojify).join("");
  var reply = `@${username}: ${emojified}`;
  if (reply.length > 140 || emojified == tweet.text) return;
  console.log(reply, "\n");
  twitter.reply(tweetID, reply);
};

getMyID();