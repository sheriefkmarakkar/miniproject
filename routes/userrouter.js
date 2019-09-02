var express = require('express')
const router = express.Router();
const path = require('path')
var bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({extended:true}))
router.use(express.static(path.join(__dirname,"../public")))
var mongoose = require('mongoose')
var url = "mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/footwears?retryWrites=true"

var m = require("../model/usermodel"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/login",function(req,res){
    
        res.render("login",{nav:[{link:"/",title:"Home"}]});
})

router.get("/signup1",function(req,res){
    
        res.render("signup",{nav:[{link:"/",title:"Home"}]});
})
router.get("/logout",function(req,res){
    res.render("index")
})
router.post("/signup",function(req,res){
    
    var m1 = new m();
  
   
   m1.name=req.body.name
   m1.pno=req.body.pno
   m1.email=req.body.email
   m1.pass=req.body.pass
    m1.save(function(err){
       
        res.redirect('/prod/p')
    })

})

router.post("/login",function(req,res){
    m1.find({email:req.body.email,pass:req.body.pass},function(err,result){
        if(err) 
        throw err;
        else if(result.length == 0)
        {
            res.redirect('/user');
        }
        else
        {
            res.redirect('/prod/p',);
        }
    })
   
    });