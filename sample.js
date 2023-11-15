let a =[1,2,3,4]
a.reduce((acumulator,arr)=>{
    if(arr>acumulator){
        return arr
    }
},a[0])