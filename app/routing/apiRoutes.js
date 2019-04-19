var friendsList = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    console.log(req.body);
    var userData = req.body;
    var userScores = userData.scores;
    console.log(userScores);

    var totalDifference = 0;

    for (var i = 0; i < friendsList.length; i++) {
      console.log(friendsList[i]);
      totalDifference = 0;
      for (var j = 0; j < friendsList[i].scores[j]; j++) {
        totalDifference += Math.abs(
          parseInt(userScores[j]) - parseInt(friendsList[i].scores[j])
        );
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friendsList[i].name;
          bestMatch.photo = friendsList[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    friendsList.push(userData);
    res.json(bestMatch);
  });
};
