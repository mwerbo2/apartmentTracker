var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

arduino.connect(); // use default arduino
arduino.connect('/dev/cu.usbmodem1411');

arduino.on('connect', function(){

  console.log("board version");
  // your-code-here

});
