const bleno = require("bleno");
const Characteristic = bleno.Characteristic;
const pkg = require("../../package.json");

// standard service and characertistic UUIDs
// https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf

module.exports = () => ({
  uuid: "180a",
  characteristics: [
    new Characteristic({
      uuid: "2a29", // Manufacturer Name
      properties: ["read"],
      value: new Buffer("Nico Martin"),
    }),
    new Characteristic({
      uuid: "2a28", // Software Revision
      properties: ["read"],
      value: new Buffer(pkg.version),
    }),
  ],
});
