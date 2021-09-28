const bleno = require("bleno");
const Characteristic = bleno.Characteristic;
const pkg = require("../../package.json");
const battery = require("../battery");

// standard service and characertistic UUIDs
// https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf

module.exports = (onBatteryUpdate) => {
  let level = 0;
  let isLoading = 0;
  onBatteryUpdate((battery) => {
    level = parseInt(battery.level, 10);
    isLoading = battery.isLoading;
  });

  return {
    uuid: "180f",
    characteristics: [
      new Characteristic({
        uuid: "2a19", // battery level
        properties: ["read", "notify"],
        onReadRequest: (offset, callback) => {
          const result = Characteristic.RESULT_SUCCESS;
          const data = new Buffer([level]);

          callback(result, data);
        },
        onSubscribe: (maxValueSize, updateValueCallback) =>
          onBatteryUpdate((battery) =>
            updateValueCallback(new Buffer([parseInt(battery.level, 10)]))
          ),
      }),
      new Characteristic({
        uuid: "17324f48a9c3487a83ffe6046cf48b51", // is Loading
        properties: ["read", "notify"],
        onReadRequest: (offset, callback) => {
          const result = Characteristic.RESULT_SUCCESS;
          const data = new Buffer([isLoading ? 1 : 0]);

          callback(result, data);
        },
        onSubscribe: (maxValueSize, updateValueCallback) =>
          onBatteryUpdate((battery) =>
            updateValueCallback(new Buffer([battery.isLoading ? 1 : 0]))
          ),
        descriptors: [
          new bleno.Descriptor({
            uuid: "75395025043045b181bdd1ad1b535b8f",
            value: "is Loading: 0 = false, 1 = true",
          }),
        ],
      }),
    ],
  };
};
