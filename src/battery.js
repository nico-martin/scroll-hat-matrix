const Ina219 = require("@nico-martin/ina219");

const battery = async (listener, timeoutInterval = 2000) => {
  const battery = Ina219(0x43);
  let level = 0;
  let isLoading = false;

  await battery.calibrate32V2A();

  const checkStatus = async () => {
    const shuntVoltage = await battery.getShuntVoltage_mV();
    const busVoltage = await battery.getBusVoltage_V();
    let newLevel = ((busVoltage - 3) / 1.2) * 100;
    if (newLevel > 100) {
      newLevel = 100;
    } else if (newLevel < 0) {
      newLevel = 0;
    }
    newLevel = Math.round(newLevel);
    const newIsLoading = shuntVoltage > 0;

    if (newLevel !== level || newIsLoading !== isLoading) {
      isLoading = newIsLoading;
      level = newLevel;
      listener({
        isLoading,
        level,
      });
    }
  };

  setInterval(checkStatus, timeoutInterval);
};

module.exports = battery;
