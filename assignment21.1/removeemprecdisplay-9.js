//ix) Drop the employee records and display
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var databaseObj  = db.db("employeeDatabase");
    databaseObj.collection("employee").remove({},function(err, obj){
        if(err) throw err;
        console.log(obj.result.n+ " record(s) deleted");
        db.close();
    });
});