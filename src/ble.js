process.env['BLENO_DEVICE_NAME'] =
  process.env.BLENO_DEVICE_NAME || 'Scroll Hat Matrix';

const bleno = require('bleno');
const deviceInfoService = require('./ble/deviceInfoService');
const batteryService = require('./ble/batteryService');
const matrixService = require('./ble/matrixService');

const bluetoothService = async (onBatteryUpdate, setMatrix) => {
  const device = deviceInfoService();
  const battery = batteryService(onBatteryUpdate);
  const matrix = matrixService(setMatrix);

  bleno.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      bleno.startAdvertising('Scroll Hat Matrix', [
        device.uuid,
        matrix.uuid,
        battery.uuid,
      ]);
    } else {
      bleno.stopAdvertising();
    }
  });

  bleno.on('advertisingStart', (err) => {
    if (err) {
      console.log('advertisingStart error', err);
      return;
    }

    bleno.setServices([device, matrix, battery]);
  });

  bleno.on('disconnect', () => {
    console.log('disconnected from client');
  });
};

module.exports = bluetoothService;
