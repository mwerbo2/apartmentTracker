let serialport = require('serialport');
let portName = '/dev/cu.usbmodem1411';
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
      id:  input
    };
    console.log("this is the input ", input);
    console.log("this is the data ", data.id)
    // if (data.id === input){
    //   console.log("ID= ", input, "Password Accepted!")

      //in this block db.none find their ID and update a column to "active or some shit"

    // }
    // console.log("this is the id: ", input);
});




module.exports = {
    getUserById(req,res,next){
        _db.any("select * from users where tag_id = " + "'" + data.id + "'" + ";")
            .then( users => {
                res.rows = users;
                next();
            })
            .catch(error => {
                console.log("error", error);
            })
    }
}

