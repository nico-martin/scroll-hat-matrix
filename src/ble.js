process.env["BLENO_DEVICE_NAME"] = "Scroll Hat Matrix";

const bleno = require("bleno");
const deviceInfoService = require("./ble/deviceInfoService");
const batteryService = require("./ble/batteryService");

const bluetoothService = async (
  gameInstance,
  intensity,
  onBatteryUpdate,
  gameState
) => {
  const device = deviceInfoService();
  const battery = batteryService(onBatteryUpdate);

  bleno.on("stateChange", (state) => {
    if (state === "poweredOn") {
      bleno.startAdvertising("Scroll Hat Matrix", [device.uuid, game.uuid]);
    } else {
      bleno.stopAdvertising();
    }
  });

  bleno.on("advertisingStart", (err) => {
    if (err) {
      console.log("advertisingStart error", err);
      return;
    }

    bleno.setServices([device, game, battery]);
  });

  bleno.on("disconnect", () => {
    console.log("disconnected from client");
  });
};

module.exports = bluetoothService;
