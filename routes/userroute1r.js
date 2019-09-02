var ex=require('Express')
var mongo=require('mongoose')
var url="mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/footwears?retryWrites=true&w=majority"
const r=ex.Router()
const m=require('../model/usermodel')
var arr=[{p:"images/item-3.jpg",iname:"Men's Taja Commissioner",item:"Boots",gender:"male",price:"500"},{p:"images/item-1.jpg",iname:"Women's Boots Shoes Maca",item:"Boots",gender:"women",price:"500"},{p:"images/item-1.jpg",iname:"Women's Minam Meaghan",item:"Boots",gender:"women",price:"400"},{p:"images/item-4.jpg",iname:"Russ Men's Sneakers",item:"Boots",gender:"male",price:"400"}]
mongo.connect(url,function(err){
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("DataBase Connected")
    }
})
r.get("/login",function(req,res){
    res.render("signup")
})
r.post("/login",function(req,res){
    res.render("")
})
r.post("/signup",function(req,res){
   var m1=new m()
   m1.name=req.body.name
   m1.pno=req.body.pno
   m1.email=req.body.email
   m1.pass=req.body.pass
   m1.save(function(err){
       if(err)
       throw err
       else
       {
           res.send("data inserted")
       }

   })
})
module.exports=r
