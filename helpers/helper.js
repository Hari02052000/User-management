var db = require('../config/connection');
var collection =require('../config/collection');
var bcrypt=require('bcrypt');
var objid=require('mongodb').ObjectId
module.exports={
    addSighnup:async(users,callback)=>{
      users.password=await bcrypt.hash(users.password,10)
        console.log('you reached addSignup:'+users.password);
     db.get().collection(collection.Username).insertOne(users);
        callback();
     },
    

     cheakUser:async(name,callback)=>{
        console.log('you reached cheak user');
     count= await db.get().collection(collection.Username).countDocuments({username:name});
     console.log('you counted');
     callback(count);
     
    },
    //this function cheak the user exist or not in database
    isUser:(data)=>{
       
      let loginstatus=false;
      let response={}
       return new Promise(async (resolve,reject)=>{
                                               
       let user=await db.get().collection(collection.Username).findOne({username: data.username});
         
         
         if(user){
            bcrypt.compare(data.password,user.password).then((status)=>{
               if(status){
                  console.log("loged in");
                  response.user=user;
                  response.status=true;
                  resolve(response);
               }
               else{
                  console.log("false");
                  resolve({status:false})
               }
            })
         }
         else{
            console.log("not a user");
            resolve({status:false});
         }
       })
    },
    //admin helpers
   isAdmin:async(data)=>{
      let loginstatus=false;
      let response={}

   return new Promise(async(resolve,reject)=>{
      let admin= await db.get().collection(collection.Username).findOne({username:data.username})
      if(admin){
        bcrypt.compare(data.password,admin.password).then((flag)=>{
           if((flag)&&(admin.acces=='admin')){
              console.log('admin logedin')
              response.admin=admin;
              response.status=true;
              resolve(response);
           }
           else{
              console.log('incoreect password or not admin')
              resolve({status:false})
           }
        })
      }
      else{
        console.log('not a user');
        resolve({status:false});
      }
  

   }) 
   },

getAllUsers:()=>{
   return new Promise(async(resolve,reject)=>{
      let users=await db.get().collection(collection.Username).find().toArray()
      resolve(users);
  })
  
},

//delete data
deletUser:(id)=>{
return new Promise((resolve,reject)=>{
   
 db.get().collection(collection.Username).deleteOne({_id:objid(id)}).then(()=>{
   resolve();
 })
})
},
//getonedata
getOneData:async(id,callback)=>{
   
   let prodect=await db.get().collection(collection.Username).findOne({_id:objid(id)});
   callback(prodect);
   },
   //update
updateUser:async (newdata,callback)=>{
   console.log(newdata);
   let oldData=await db.get().collection(collection.Username).findOne({_id:objid(newdata.id)});
   if((oldData.password)!=(newdata.password))
   {
      newdata.password=await bcrypt.hash(newdata.password,10)
   }
 await db.get().collection(collection.Username).updateOne({_id:objid(newdata.id)},
       {$set:{username:newdata.username,password:newdata.password,acces:newdata.acces}})
       callback();
}   

}


