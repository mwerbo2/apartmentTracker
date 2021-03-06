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
//Returning user by RFID
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

    let Volts;
    let Humidity;
    let Temperature;
    let farenheight;

sp.on('data', function(input) {
    data = {
      id:  input,
    };

    let tag;

  function grabReadings() {
    if (input.includes("Voltage=")) {
      Volts = (input.split("= "))[1]
      console.log("Volts = ", Volts)
    };
    if (input.includes("Humidity")) {
      Humidity = (input.split("= "))[1]
    console.log("Humidity = ", Humidity)
    }
    if (input.includes("Temperature")) {
      Temperature = (input.split("= "))[1]
      console.log(Temperature, "is it")
      celciusToFarenheight(Temperature)
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

// console.log("Temperature = ", farenheight)

  function saveVoltsToDb() {
    _db.none("INSERT INTO readings (reading_type, reading_value) VALUES " + "(" + "'Volts'" + "," + "'" + Volts + "'" + ")" + ";")
    .then( results => {
      console.log("successfully saved volts")
    })
    .catch(error => {
      console.log("error saving volts", error);
    })
  }

function updateReading(value, sensor) {
  _db.any("UPDATE readings SET reading_value =" + "'" + value + "'" + " WHERE reading_type= " + "'" + sensor + "'"+";")
    .then( data => {
      console.log('Update successful!');
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function updateVoltReading(v) {
  _db.any("UPDATE readings SET reading_value =" + "'" + v + "'" + " WHERE reading_type= "+ "'Volts'"+";")
    .then( data => {
      // console.log('Update successful!');
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function updateTempReading(t) {
  _db.any("UPDATE readings SET reading_value =" + "'" + t + "'" + " WHERE reading_type= "+ "'Temperature'"+";")
    .then( data => {
      // console.log('Update successful!');
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function updateHumidityReading(h) {
  _db.any("UPDATE readings SET reading_value =" + "'" + h + "'" + " WHERE reading_type= "+ "'Humidity'"+";")
    .then( data => {
      // console.log("humidity: ", data);
    })
    .catch( error => {
      console.log('Error ',error);
    });
}








    // saveVoltsToDb();
updateVoltReading(Volts);
console.log("this temp", farenheight)
updateTempReading(farenheight);
updateHumidityReading(Humidity)
    // updateReading(Volts, 'Volts')
    // updateReading(Temperature, 'Temperature')
    // updateReading(Humidity, 'Humidity')

    getUserByID()
        .then( result => {
            // console.log('Result', result);
        })
        .catch(error => {
            console.log("error", error);
        })
});

function getReadingsData(req,res,next) {
  _db.many("select * from readings;")
    .then( results => {
      res.rows = results;
      console.log(results);
      next();
    })
    .catch(error => {
      console.log("Error getting readings ", error);
    })
}

//Environmental Preferences




module.exports = { getUserById, getReadingsData }

