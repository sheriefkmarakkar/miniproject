var ex=require('Express')
var mongo=require('mongoose')
var url="mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/footwears?retryWrites=true&w=majority"
const r=ex.Router()
const m=require('../model/productmodel')
var multer=require('multer')
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  var type = multer({ storage : storage}).single('image');

const path=require('path')
r.use(ex.static(path.join(__dirname,"/public")))
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
r.get("/addproduct",function(req,res){
    res.render("newproducts")
})
r.post("/login",function(req,res){
    res.render("")
})
r.post("/newproduct",function(req,res){
   var m1=new m(req.body)
   m1.iname=req.body.iname
  m1.item=req.body.item
  m1.gender=req.body.gender
  m1.price=req.body.price
  m1.image=req.file.p;
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
