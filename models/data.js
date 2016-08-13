let serialport = require('serialport');
let portName =  '/dev/cu.usbmodem1421';
let data = {};
const pg = require('pg-promise')({});
const config = {
    host:       process.env.DB_HOST,
    port:       process.env.DB_PORT,
    database:   process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
};
const _db = pg(config);

//conect to db pg promise

function getUserById(req,res,next){
    _db.any("select * from users where tag_id = " + "'" + data.id + "'" + ";")
        .then( users => {
            res.rows = users;
            next();
        })
        .catch(error => {
            console.log("error", error);
        })
}

function getUserByID() {
    return _db.any("select * from users where tag_id = " + "'" + data.id + "'" + ";")
}

// let led = pin(13);
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
      id:  input,
    };

   if (input.includes("Voltage=")) {
      console.log(input.split("= "))
   };
   if (input.includes("Humidity")) {
    console.log(input.split("= "))
   }
   if (input.includes("Temperature")) {
    console.log(input.split("= "))
   }
   if (input.includes("Tag")) {
    console.log(input.split("= "))
   }


    getUserByID()
        .then( result => {
            // console.log('Result', result);
        })
        .catch(error => {
            console.log("error", error);
        })
});

// function taskComplete(req,res,next) {
//   put sp.on() in here when using routes with RFID activity
// }



module.exports = { getUserById }

