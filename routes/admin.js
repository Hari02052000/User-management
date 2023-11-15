var express = require('express');
const { response } = require('../app');
var router = express.Router();
var helper=require('../helpers/helper');




/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.adminloged){
   helper.getAllUsers().then((users)=>{
   res.render('admin/adminhome',{users});
    })

  }
else
{
 res.render('admin/adminlogin');}

  
  
});

router.post('/login',function(req,res)
{//calling is admin
  helper.isAdmin(req.body).then((response)=>{
    if(response.status){
     helper.getAllUsers().then((users)=>{
      req.session.adminloged=true
      res.render('admin/adminhome',{users});
     })
      
    }
    else{
      let err="enterd admin  does not exist "
      res.render('admin/adminlogin',{err});
    }
  })
  
  
})
//logout
router.get('/login/logout',function(req,res){
  req.session.adminloged=false
  res.redirect('/admin');
})

//addusers

router.get('/login/addusers',(req,res)=>{
  res.render('admin/addusers')
})
//code for create new user
router.post('/login/addusers/create',(req,res)=>{
  console.log(req.body);
  helper.cheakUser(req.body.username,(count)=>{
    console.log('you reached call back');
    console.log(count);
    if(count==0){
      console.log('you cheaked if')
      helper.addSighnup(req.body,()=>{ 
      
        
        helper.getAllUsers().then((users)=>{
        res.render('admin/adminhome',{users});
         })
       })
     
      }
      else{
        let err="user is alredy exist";
        res.render("admin/addusers",{err})
        
      }
      
  })


})

//update page
router.get('/login/update/:id',(req,res)=>{
 // res.render('admin/updateUsers');
  let prodId=req.params.id
  helper.getOneData(prodId,(prodect)=>{
    console.log(prodect)
   res.render('admin/updateUsers',{prodect});
  })
})
//update code
router.post('/login/update',(req,res)=>{
  helper.updateUser(req.body,()=>{
    console.log('updated');
    helper.getAllUsers().then((users)=>{
      res.render('admin/adminhome',{users});
       })


  })
})




//delete
router.get('/login/delete/:id',(req,res)=>{
  let prodId=req.params.id
  helper.deletUser(prodId).then((response)=>{
    helper.getAllUsers().then((users)=>{
      res.render('admin/adminhome',{users});
       })
  })
})


module.exports = router;
