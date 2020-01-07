var express=require('express');
var router=express.Router()
var categorymodel=require('../model/category');
var mongo = require('mongodb');
router.use(express.json())

router.get('/',(req,res)=>{
    // if (!req.isAuthenticated()) { 
    //     res.redirect('/auth/login');
    //   }
    // usermodel.findUsersByAdmin(req.app.locals.db,req.session.passport.user).then(function(result){
    //     res.render('employee/allusers',{result});
    // })
    
});
router.get('/add',(req,res)=>{
    res.render('category/addoredit');
});
router.get('/addproduct/:id',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);
    categorymodel.findCategory(req.app.locals.db,_id).then(function(data){  
        data[0].addproduct='true';       
        console.log(data)
        res.render('category/addoreditproduct',{data});
    })
});
router.post('/add',(req,res)=>{
    const messages = req.flash();
    // const _id = new mongo.ObjectID(req.session.passport.user);
    if(req.body.name=="" ||  req.body.description==""){
        req.flash('error', 'Please provide details.');
        res.redirect('/category/add');
      }else{
        data={
            name:req.body.name,
            description:req.body.description
        }
        categorymodel.insertCategory(req.app.locals.db,data).then(function(err,result){            
            res.redirect('/')
        })
      }
})
router.post('/addproduct',(req,res)=>{
    const messages = req.flash();
    
    if(req.body.pname=="" ||  req.body.pdescription==""){
        req.flash('error', 'Please provide details.');
        res.redirect('/category/addproduct/'+req.body.catid);
      }else{
        data={
            catid: new mongo.ObjectID(req.body.catid),
            pname:req.body.pname,
            pdescription:req.body.pdescription
        }
        categorymodel.insertProduct(req.app.locals.db,data).then(function(err,result){            
            res.redirect('/category/showproduct/'+req.body.catid)
        })
      }
})

router.get('/edit/:id',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);
    categorymodel.findCategory(req.app.locals.db,_id).then(function(data){        
        res.render('category/addoreditproduct',{data:data});
    })
})

router.get('/editproduct/:id',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);
    categorymodel.findProdctCategory(req.app.locals.db,_id).then(function(data){    
        console.log('finalllllll')
        console.log(data)    
        res.render('category/addoreditproduct',{data});
    })
})

router.post('/updateproduct',(req,res)=>{
    if(req.body.pname=="" ||  req.body.pdescription==""){
        req.flash('error', 'Please provide details.');
        res.redirect('/category/editproduct/'+req.body.productid);
    }else{
        var _id = new mongo.ObjectID(req.body.productid);
        var categoryid =new mongo.ObjectID(req.body.catid)
        data={
            pname:req.body.pname,
            pdescription:req.body.pdescription,     
            catid:categoryid
        }
        console.log(data)
        categorymodel.updateProduct(req.app.locals.db,_id,data).then(function(err,result){    
            console.log(result)    
            res.redirect('/category/showproduct/'+req.body.catid)
        })
    }

})

router.get('/delete/:id',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);     
    categorymodel.deleteCategory(req.app.locals.db,_id).then(function(err,result){            
        res.redirect('/')
    })
})

router.get('/deleteproduct/:id/:catid',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);     
    categorymodel.deleteProduct(req.app.locals.db,_id).then(function(err,result){
        res.redirect('/category/showproduct/'+req.params.catid)
    })
})

router.get('/showproduct/:id',(req,res)=>{
    const _id = new mongo.ObjectID(req.params.id);     
    categorymodel.findProductsForCategories(req.app.locals.db,_id).then(function(result){
        console.log(result)
        res.render('category/allproducts',{result});
    })
})

module.exports=router;