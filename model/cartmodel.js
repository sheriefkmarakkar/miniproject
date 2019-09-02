var mongo=require('mongoose')
var schema=mongo.Schema;
var uSchema=new schema({
    iname:String,price:String,image:String
})
var usermodel=mongo.model("modeluser2",uSchema,'cart')

module.exports=usermodel;