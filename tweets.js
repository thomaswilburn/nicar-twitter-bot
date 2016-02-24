var Twitter = require("twitter");

var client = new Twitter(require("./auth.json"));

module.exports = {
  getUserID: function(screenname, callback) {
    client.get("users/lookup", { screen_name: screenname }, function(err, users) {
      if (err || !users.length) return callback(err || "User not found");
      callback(null, users[0].id_str);
    });
  },
  getFollowerIDs: function(id, callback) {
    client.get("followers/ids", { user_id: id }, function(err, followers) {
      if (err) return callback(err);
      callback(null, followers.ids);
    });
  },
  tweet: function(text, callback) {
    client.post("statuses/update", { status: text }, callback);
  },
  reply: function(to, text, callback) {
    client.post("statuses/update", { status: text, in_reply_to_status_id: to }, callback);
  },
  client: client
}