var emojify = require("./emojify");

// 1. Get the current user's ID from users/lookup

// 2. Get the user's followers with followers/ids

// 3. Connect to the stream for those followers using statuses/filter

// 4. On data, reply to tweets matching a given phrase with statuses/update