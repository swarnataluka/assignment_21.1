// i) find and Display only designation of an Employee
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var databaseObj = db.db("employeeDatabase");
        databaseObj.collection("employee").find({}).project({_id: 0, designation: 1}).toArray(function(err, res){
            if(err) throw err;
            console.log(res);
            db.close();
        });
    });