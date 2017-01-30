const express                                           = require('express');
const app                                               = express();
const bodyParser                                        = require('body-parser');
const path                                              = require('path');
const logger                                            = require('morgan');
const port                                              = process.env.port || 3000;
const homeRoute                                         = require('./routes/home');
const userRoute                                         = require('./routes/user');


app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/user', userRoute);
app.use('/', homeRoute);


app.listen(port, function(){
  console.log('Server listening on port ', port)
});
