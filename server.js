const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const path = require('path');
const logger = require('morgan');
const httpServer = require("http").createServer(app);
// const j5 = require("johnny-five");
const port = process.env.port || 3000;
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');



app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use('/user', userRoute)
app.use('/', homeRoute);


// app.get('/', function(req, res) {
//   res.render('index')
// });

httpServer.listen(port);
console.log('Server listening on port ', port);
