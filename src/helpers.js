const arrayToLength = (array, length, fill = 0) => {
  if (array.length > length) {
    array = array.slice(0, length);
  } else if (array.length < length) {
    array = [...array, ...Array(length - array.length).fill(fill)];
  }
  return array;
};

const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

module.exports = {
  arrayToLength,
  wait,
  randomIntFromInterval,
};
