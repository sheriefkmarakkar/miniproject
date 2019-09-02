var mongo=require('mongoose')
var schema=mongo.Schema;
var uSchema=new schema({
    id:String,iname:String,item:String,gender:String,price:String,image:String
})
var usermodel=mongo.model("modeluser1",uSchema,'product')

module.exports=usermodel;