var async = require("async");
var emojify = require("./emojify");
var twitter = require("./tweets");

var getMyID = c => twitter.getUserID("thomaswilburn", c);

var streamMyFollowers = function(followers, c) {
  twitter.client.stream("statuses/filter", { follow: followers.join() }, s => c(null, s));
};

var onTweet = function(tweet) {
  //The stream won't apply keyword search to followers, so filter here instead
  if (!tweet.text.match(/emojify/)) return;
  var username = tweet.user.screen_name;
  var tweetID = tweet.id_str;
  var emojified = tweet.text.split(/\b/).map(emojify).join("");
  var reply = `@${username}: ${emojified}`;
  console.log(reply);
  if (reply.length > 140 || emojified == tweet.text) return;
  twitter.reply(tweetID, reply);
};

async.waterfall([getMyID, twitter.getFollowerIDs, streamMyFollowers], function(err, stream) {
  if (err) return console.log("Fatal error:", err);
  stream.on("error", e => console.log("Stream error:", e));
  stream.on("data", onTweet);
  stream.on("end", e => console.log("Stream ended:", e));
});