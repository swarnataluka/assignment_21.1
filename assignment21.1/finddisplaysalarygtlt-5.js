/* v) find and Display the records of an employee whose salary in between 5000 to 40000 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var databaseObj  = db.db("employeeDatabase");
    databaseObj.collection("employee").find({salary: {$gt: 5000, $lt: 40000}}).project({_id: 1, ename: 1, department: 1, designation: 1, salary: 1, dateofjoining: 1, city: 1 }).toArray(function(err, res){
            if(err) throw err;
            console.log(res);
            db.close();
    });
});