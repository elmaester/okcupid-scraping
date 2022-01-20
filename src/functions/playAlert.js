function playAlert(path) {
  const player = require("play-sound")((opts = {}));

  player.play(path, function (err) {
    if (err) throw err;
  });
}

module.exports = playAlert;
