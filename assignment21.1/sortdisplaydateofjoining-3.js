//iii) Sort and Display the records of an employee based on the date of joining
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var databaseObj  = db.db("employeeDatabase");
        databaseObj.collection("employee").find().sort({dateofjoining: -1}).project({_id: 1, ename: 1, department: 1, designation: 1, salary: 1, dateofjoining: 1, city: 1 }).toArray(function(err, res){
            if(err) throw err;
            console.log(res);
            db.close();
        });
    });