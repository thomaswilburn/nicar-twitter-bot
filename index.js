var async = require("async");
var emojify = require("./emojify");
var twitter = require("./tweets");

var onTweet = function(tweet) {
  var username = tweet.user.screen_name;
  var tweetID = tweet.id_str;
  var emojified = tweet.text.split(/\b/).map(emojify).join("");
  var reply = `@${username}: ${emojified}`;
  if (reply.length > 140 || emojified == tweet.text) return;
  twitter.reply(tweetID, reply);
};

async.waterfall([
  c => twitter.getUserID("thomaswilburn", c),
  (id, c) => twitter.getFollowerIDs(id, c),
  (followers, c) => twitter.client.stream("statuses/filter", { follow: followers.join(), track: "emojify" }, c)
], function(err, stream) {
  if (err) return console.log("Fatal error:", err);
  stream.on("error", e => console.log("Stream error:", e);
  stream.on("data", onTweet);
  stream.on("end", e => console.log("Stream ended:", e));
});