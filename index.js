const events = require('events');
const em = new events.EventEmitter();
const scrollController = new (require('scroll-controller'))();
const battery = require('./src/battery');
const bluetoothService = require('./src/ble');
require('dotenv').config();

const init = async () => {
  await battery((values) => em.emit('BATTERY_UPDATE', values));
  const onBatteryUpdate = (listener) =>
    em.addListener('BATTERY_UPDATE', listener);

  await scrollController.init();

  const setMatrix = (array) => scrollController.display(array);
  await bluetoothService(onBatteryUpdate, setMatrix);
};

init();
