const router = require('express').Router();
const dataModel = require('../models/data')

const sendJSONresp = (req,res)=>res.json(res.rows)

// router.get('/', function(req,res){
//   res.render('home');
// })


router.get('/data', dataModel.getUserById, sendJSONresp);

router.get('/r', dataModel.getUserById, function(req, res){
  res.render('home', {users: res.rows})
});

// router.get('/data', buttonData.alertHit, function(req, res){
//   console.log("made it to the button route")
//   res.json(res.counter)
// });



module.exports = router;
