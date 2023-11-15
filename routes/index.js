var express = require('express');
const { response } = require('../app');
var router = express.Router();
var MonogoClient=require('mongodb').MongoClient
var helper=require('../helpers/helper');

/* GET home page. */
router.get('/', function(req, res) {
 if(req.session.loggedin){
  res.render('users/home');
 }
 else{ 
  res.render('index');}
});
router.get('/sighnup',function(req,res){
  res.render('users/sighnup.hbs');
})

router.post('/sighnup',function(req,res){
 //code for add details to database
console.log(req.body);
helper.cheakUser(req.body.username,(count)=>{
  console.log('you reached call back');
  console.log(count);
  if(count==0){
    console.log('you cheaked if')
    helper.addSighnup(req.body,()=>{ 
    
     res.send("your details added please login to continue ");})
   
    }
    else{
      res.send("user is alredy exist");
    }
    
})
 
})
module.exports = router;



