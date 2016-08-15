const router = require('express').Router();
const userModel = require('../models/user')
const dataModel = require('../models/data')


const sendJSONresp = (req,res)=>res.json(res.rows)






router.post('/new', userModel.createUser, function(req,res){
  console.log("made it to the user route")
  res.redirect('/data')
})

router.get('/', dataModel.getReadingsData, function(req,res){
  res.render('profile', {data:res.rows})
})


// router.get('/data', buttonData.alertHit, function(req, res){
//   console.log("made it to the button route")
//   res.json(res.counter)
// });



module.exports = router;
