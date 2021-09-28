const { arrayToLength } = require("./helpers");

const fixedMatrixSize = (matrix, height, width) =>
  arrayToLength(matrix, height, []).map((row) => arrayToLength(row, width));

const matrixToArray = (rows, height = 7, width = 17) => {
  const cleanSizeMatrix = fixedMatrixSize(rows, height, width);

  return cleanSizeMatrix.reduce(
    (acc, rows) => [...acc, ...rows.map((value) => value)],
    []
  );
};

module.exports = {
  matrixToArray,
};
