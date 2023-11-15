

function validation(){
 let password =document.getElementById('pass').value;
 let confpassword =document.getElementById('confpass').value;
 let allert =document.getElementById("we")
 let btn =document.getElementById("btn");


 if(password!=confpassword)
 {
   btn.disabled=true;
   allert.innerHTML='enterd passwords are not same'
    

 }
 else
 {
   btn.disabled=false;
   allert.innerHTML='';
 }
}

