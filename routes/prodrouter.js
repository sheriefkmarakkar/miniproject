var express = require('express')
const router = express.Router();
var arr=[{image:"images/item-3.jpg",iname:"Men's Taja Commissioner",item:"Boots",gender:"male",price:"500"},{image:"images/item-1.jpg",iname:"Women's Boots Shoes Maca",item:"Boots",gender:"women",price:"500"},{image:"images/item-1.jpg",iname:"Women's Minam Meaghan",item:"Boots",gender:"women",price:"400"},{image:"images/item-4.jpg",iname:"Russ Men's Sneakers",item:"Boots",gender:"male",price:"400"}];
const path = require('path')
var multer = require('multer');
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
var upload = multer({ storage : storage}).single('filename');
router.use(express.static(path.join(__dirname,"../public")))
var mongoose = require('mongoose')
var url = "mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/footwears?retryWrites=true"
var m = require("../model/productmodel"); 
var c=require("../model/cartmodel")
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/p",function(req,res){
    m.find({},function(err,result){
        if(err)
        res.render("products",{gender:"Latest Collections",arr:arr,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
        else
        res.render("products",{gender:"Latest Collections",arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
    });})

    router.get("/men",function(req,res){
        m.find({},function(err,result){
            
            if(err)
            res.render("products",{gender:"Men's Collections",arr:arr,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
            else
            res.render("products",{gender:"Men's Collections",arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
        });})

        router.get("/women",function(req,res){
            m.find({},function(err,result){
                
                if(err)
                res.render("products",{gender:"Women's Collections",arr:arr,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
                else
                res.render("products",{gender:"Women's Collections",arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
            });})
    


router.get("/view/:img",function(req,res){    
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

router.get("/singleproduct/:id",function(req,res){
m.find({_id:req.params.id},function(err,result){
    res.render("singleproduct",{arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]});  
  })
    
})

router.get("/addproduct",function(req,res){
        res.render("newproducts",{nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]});
})

router.post("/addproduct",upload,function(req,res){
    var m1=new m(req.body)
   m1.id=req.body.id;
    m1.iname=req.body.iname
   m1.item=req.body.item
   m1.gender=req.body.gender
   m1.price=req.body.price
   m1.image=req.file.filename
    m1.save(function(err){
       
           console.log("Added");
           if(err)
                res.render("products",{gender:"Latest Collections",arr:arr,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
                else
                res.redirect('/prod/p')
       })
   })


router.get("/updateproduct",function(req,res){
    m.find({},function(err,result){
        
        res.render("updateproduct",{gender:"Latest Collections",arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
    });
})

router.get("/editproduct/:id",function(req,res){
    m.find({_id:req.params.id},function(err,result){
        if (err) throw err;
        res.render("editproduct",{gender:"Collections",arr:result,nav:[{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"},{link:"/user/logout",title:"Logout"}]})
    })
})
    
router.post("/editproduct/:id", upload, function(req,res){
    m.updateOne({_id:req.params.id} ,{$set:{
        iname:req.body.iname,
        item : req.body.item,
        gender : req.body.gender,
     
        price:req.body.price
    }}, function(err,result){
        if (err) throw err;
        else{
            m.find({},(err,result)=>{
                if (err) throw err;
                else
                    res.redirect("/prod/updateproduct")
            })
        }
    }) 
})

router.get("/deleteproduct/:pid",function(req,res){
    m.deleteOne({_id:req.params.pid},function(err,result){
        if (err) throw err;
        else
        {
            m.find({},(err,result)=>{
                if(err) throw err;
                else
                    res.redirect("/prod/updateproduct")
            })
        }
    })
})
router.get("/addc/:iname/:price",function(req,res){
 var c1=new c()  
 c1.iname=req.params.iname;
 c1.price=req.params.price;
 c1.save(function(err){
     res.redirect('/prod/p')
 }) 
})
 router.get("/cart",function(req,res){
     c.find({},function(err,result){
         res.render("cart",{arr:result})
     })
  
 })

    
