var express=require('express')
const app=express();
var r=require('./routes/userrouter')
var p=require('./routes/productrouter')
var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({ useNewUrlParser: true }));
const path=require('path')
app.use(express.static(path.join(__dirname,"/public")))
var arr=[{p:"images/item-3.jpg",iname:"Men's Taja Commissioner",item:"Boots",gender:"male",price:"500"},{p:"images/item-1.jpg",iname:"Women's Boots Shoes Maca",item:"Boots",gender:"women",price:"500"},{p:"images/item-1.jpg",iname:"Women's Minam Meaghan",item:"Boots",gender:"women",price:"400"},{p:"images/item-4.jpg",iname:"Russ Men's Sneakers",item:"Boots",gender:"male",price:"400"}]

app.set("view engine","ejs")
app.set("views",".")

app.listen(5656,function(req,res){
   console.log("Server Started")
})
app.get("/",function(req,res){
    res.render("products",{gender:"Latest Collections",arr:[{p:"images/item-3.jpg",iname:"Men's Taja Commissioner",item:"Boots",gender:"male",price:"500"},{p:"images/item-1.jpg",iname:"Women's Boots Shoes Maca",item:"Boots",gender:"women",price:"500"},{p:"images/item-1.jpg",iname:"Women's Minam Meaghan",item:"Boots",gender:"women",price:"400"},{p:"images/item-4.jpg",iname:"Russ Men's Sneakers",item:"Boots",gender:"male",price:"400"}]})
})
app.get("/",function(req,res){
    res.render("")
})
app.use("/user",r)
app.use("/product",p)
