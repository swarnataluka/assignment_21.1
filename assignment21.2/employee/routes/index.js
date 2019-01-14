var express = require('express');
var app = express();

app.get('/', function(req, res){
//render to views/index.ejs template file
res.render('index', {title: 'This is an Employee application'});
});

// MongoClient object is created
var MongoClient = require('mongodb').MongoClient; 
/* employeeDatabase is created in MongoDB specified connection URL with the connect ip address */
var url = "mongodb://localhost:27017/";
MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
    if(err) throw err;
    var databaseObj  = db.db("employeeDatabase");
    //Creates employee collection with application specific validation rules
    databaseObj.createCollection("employee", {
    validator: {
    $jsonSchema: {
    bsonType: "object",
    required: ["Ename","department","designation","salary","dateofjoining","city"],
            properties:{
                        Ename:{
                        bsonType:"string",
                        description: "must be a string and is required"
                        },
            department: {
                        enum: ["clerical_staff","support_staff","ops_staff","development_staff","management_staff","logistics_staff"],
                        description: "must be a string and is required"
                        },
            designation: {
                        enum: [{"clerical_staff" : "data_entry","support_staff" : "technical_support","ops_staff" : "network administrator","development_staff" : "Developer","management_staff" : "manager","logistics_staff" : "production_team_leader"}],
                        description: "must be a string and is required"
                        },
                salary: {
                        bsonType: "number",
                        minimum: 3000, 
                        maximum: 50000,
                        description: "must be an integer in [3000, 50000] and is required"
                        },
        dateofjoining: {
                        bsonType: "date",
                        set: function(v){
                            return new Date(v.getFullYear(), v.getMonth(), v.getDate());
                        },
                        description: "must be a valid date format"
                        },
                city:   {
                        enum: ["Delhi", "Bangalore", "Newyork", "California", "Singapore"],
                        description: "Insert the five cities"
                        }
        
                    }
        
                }
            },
            validationAction: "warn"
        })      
//empObj is a JSON object 
var empObj = [
    {Ename: "Ajay", department:"clerical_staff", designation:"data_entry",salary: 8000, dateofjoining:"2016-05-04", city:"Delhi"},
    {Ename: "Hari", department:"logistics_staff",designation:"team_leader",salary: 17000,dateofjoining:"2005-02-01", city:"Bangalore"},
    {Ename: "James", department:"ops_staff", designation :"network_administrator",salary: 15000, dateofjoining:"2012-06-01", city:"Newyork"},
    {Ename: "Vani", department:"development_staff", designation :"Developer",salary: 16000,dateofjoining:"2013-03-15", city:"California"},
    {Ename: "Matt", department:"management_staff", designation:"manager",salary: 50000,dateofjoining:"2009-03-15", city:"Singapore"},
    {Ename: "Ashley", department:"support_staff", designation :"technical_support",salary: 10000,dateofjoining:"2014-08-01", city:"Bangalore"},
    {Ename: "Sandhya", department:"support_staff",designation:"technical_support",salary: 11000, dateofjoining:"2013-05-01", city:"Bangalore"},
    {Ename: "Matt", department:"management_staff",designation:"manager",salary: 25000, dateofjoining:"2011-04-21", city:"Singapore"},
    {Ename: "Paul", department:"support_staff",designation:"technical_support",salary: 10000, dateofjoining:"2016-07-12",city:"Bangalore"},
    {Ename: "Guru", department:"support_staff", designation:"Developer",salary: 13000,dateofjoining:"2015-06-08", city:"Bangalore"}];
    databaseObj.collection("employee").insertMany(empObj, function(err, res){
        if(err) throw err;
        console.log("Collection Employee with list of records "+ res.insertedCount + " created.");
        db.close();
    });
});

module.exports = app;