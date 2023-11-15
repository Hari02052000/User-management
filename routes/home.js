var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper');



router.post('/', function(req, res) {
  console.log(req.body);
    helper.isUser(req.body).then((response)=>{
      if(response.status){
        req.session.loggedin=true
        console.log(req.session);
        res.redirect('/');
      }
      
      else{
        let err="invalid username or password"
        res.render('index',{err}); 
      }
    });
  
    
  });

  router.get('/logout',function(req,res){
    req.session.loggedin=false
    res.redirect('/');
  })

module.exports = router;