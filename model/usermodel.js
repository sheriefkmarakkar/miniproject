var mongo=require('mongoose')
var schema=mongo.Schema;
var uSchema=new schema({
    
    name:String,pno:String,email:String,pass:String
})
var usermodel=mongo.model("modeluser",uSchema,'customer')

module.exports=usermodel;