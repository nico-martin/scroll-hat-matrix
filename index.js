const scrollController = new (require("scroll-controller"))();
const battery = require("./src/battery");

const GAME_STATES = {
  GAME: "GAME",
  STOP: "STOP",
  RESTART: "RESTART",
  PAUSE: "PAUSE",
};

const init = async () => {
  const width = 17;
  const height = 7;
  const field = Array(height).fill(Array(width).fill(0));

  console.log(field)
};

init();
