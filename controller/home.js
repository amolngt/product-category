var express=require('express');
var router=express.Router()
var catrgorymodel=require('../model/category');
// var mongo = require('mongodb');
router.use(express.json())

router.get('/',(req,res)=>{
    catrgorymodel.findCategories(req.app.locals.db).then(function(result){
        res.render('category/home',{result});
    })
});

// router.get('/add',(req,res)=>{
//     res.render('category/addoredit');
// });

module.exports=router;