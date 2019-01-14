/*vi) find and display all the records of an employee except whose designation is developer. */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var databaseObj  = db.db("employeeDatabase");
    databaseObj.collection("employee").find({designation: {$ne: "Developer"}}).project({_id: 1, Ename: 1, department: 1, designation: 1, salary: 1, dateofjoining: 1, city: 1 }).toArray(function(err, res){
        if(err) throw err;
        console.log(res);
        db.close();
    });
});