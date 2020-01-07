var mongo = require('mongodb');
function findCategories(db) {
    return new Promise(function(resolve, reject) {    
    db.collection('categorytb').find({}).toArray(function(err, result) {        
        resolve(result);        
        });
    });
}
    
function insertCategory(db,data) {
    return new Promise(function(resolve, reject) {
    db.collection('categorytb').insertOne(data,function(err, result) {
        resolve(result);        
        });
    
    });
}
function insertProduct(db,data) {
    return new Promise(function(resolve, reject) {
    db.collection('producttb').insertOne(data,function(err, result) {
        resolve(result);        
        });
    
    });
}

function findCategory(db,catid) {
  
    return new Promise(function(resolve, reject) {
    db.collection('categorytb').find({'_id':catid}).toArray(function(err, result) {        
        resolve(result);        
        });
    });
    
}
function findProductsForCategories(db,catid) {
    return new Promise(function(resolve, reject) {
        db.collection('categorytb').aggregate([{
            $lookup:{
                from:"producttb",
                localField:"_id",
                foreignField:"catid",
                as:"res"
            }},{
                $match: { "_id": catid}
             }
            ]).toArray(function(err, result) {        
                resolve(result);        
                });
            });
}
function findProdctCategory(db,catid) {
    return new Promise(function(resolve, reject) {
        db.collection('producttb').find({'_id':catid}).toArray(function(err, result) {
            const _id = new mongo.ObjectID(result[0].catid);
            db.collection('categorytb').find({'_id':_id}).toArray(function(err, res) {             
                result[0]['cat']=res[0].name;
                    resolve(result);        
                    });
                });    
            
        });
}


function updateCategory(db,catid,data) {    
    return new Promise(function(resolve, reject) {
   
    db.collection("categorytb").update({ "_id": catid }, { $set: data }, function (err, result) {      
        resolve(result);          
    });
});
}
function updateProduct(db,id,data) {    
    return new Promise(function(resolve, reject) {
   
    db.collection("producttb").update({ "_id": id }, { $set: data }, function (err, result) {      
        resolve(result);          
    });
});
}
function deleteCategory(db,catid) {    
    return new Promise(function(resolve, reject) {
   
    db.collection("categorytb").remove({ "_id": catid }, function (err, result) {
        resolve(result);          
    });
});
}

function deleteProduct(db,catid) {    
    return new Promise(function(resolve, reject) {
    db.collection("producttb").remove({ "_id": catid }, function (err, result) {
        resolve(result);          
    });
});
}


module.exports={findCategories,insertCategory,findCategory,updateCategory,deleteCategory,findProductsForCategories,insertProduct,findProdctCategory,updateProduct,deleteProduct}
