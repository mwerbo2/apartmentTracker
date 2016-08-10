let serialport = require('serialport');
let portName = '/dev/cu.usbmodem1411';
let data = {};

var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

sp.on('data', function(input) {
    data = {
      id:  "4F0040968A"
    };
    console.log(input);
    if (data.id === input){
      console.log("ID= ", input, "Password Accepted!")
    }
    // console.log("this is the id: ", input);
});

