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
    let volts;
    let humidity;
    let celsiusTemp;
    let tag;
  function grabReadings() {
    if (input.includes("Voltage=")) {
      volts = (input.split("= "))[1]
      console.log("Volts = ", volts)
    };
    if (input.includes("Humidity")) {
      humidity = (input.split("= "))[1]
    console.log("Humidity = ", humidity)
    }
    if (input.includes("Temperature")) {
      celsiusTemp = (input.split("= "))[1]
      celciusToFarenheight(celsiusTemp)
    }
    if (input.includes("Tag")) {
      tag = input.split("= ")[1]
    console.log("Tag ID = ", tag)
    }
  }

grabReadings()

  function celciusToFarenheight(temp) {
    let tempInt = parseInt(temp)
    farenheight = (((tempInt * 9) / 5) + 32)
     console.log("Temperature = ", farenheight)
   }


  function saveDataToDb() {
    _db.none("INSERT INTO readings (reading_type, reading_value) VALUES " + "(" + "'Volts'" + "," + "'" + volts + "'" + ")" + ";")
    .then( results => {
      console.log("successfully saved volts")
    })
    .catch(error => {
      console.log("error saving volts", error);
    })
  }

    saveDataToDb()
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

