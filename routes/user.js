const router = require('express').Router();
const userModel = require('../models/user')

const sendJSONresp = (req,res)=>res.json(res.rows)






router.post('/new', userModel.createUser, function(req,res){
  console.log("made it to the user route")
  res.render('profile')
})



// router.get('/data', buttonData.alertHit, function(req, res){
//   console.log("made it to the button route")
//   res.json(res.counter)
// });



module.exports = router;
