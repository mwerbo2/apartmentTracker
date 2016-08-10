const router = require('express').Router();
const buttonData = require('../models/data')


router.get('/', function(req, res){
  res.render('home')
});

// router.get('/data', buttonData.alertHit, function(req, res){
//   console.log("made it to the button route")
//   res.json(res.counter)
// });



module.exports = router;
