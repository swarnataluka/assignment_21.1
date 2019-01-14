var express = require('express');
var app = express();
var ObjectId = require('mongodb').ObjectId;

//Show list of employees
app.get('/', function(req, res, next){
// fetch and sort employee collection by id in descending order
req.db.collection('employee').find().sort({"_id": -1}).toArray(function(err, result){
//if (err) return req.flash(err)
	if(err){
			req.flash('error', err)
			res.render('employee/list', {
				title: 'Employee List',
				data:''
			})
	}else{
//render to views/employee/list.ejs template fileCreatedDate
			res.render('employee/list', {
				title: 'Employee list',
				data: result
			})
		}
	})
})
//Show ADD employee form
app.get('/add', function(req, res, next){
// render to views/employee/add.ejs
			res.render('employee/add', {
				title: 'Add new Employee',
				Ename: '',
				department: '',
				designation: '',
				salary: '',
				dateofjoining: '',
				city: ''
			})
})
// Add new employee post action
app.post('/add', function(req, res, next){
	req.assert('Ename1', 'Ename is required').notEmpty()  //validate Ename
	req.assert('department1', 'Department is required').notEmpty() //validate department
	req.assert('designation1', 'Designation is required').notEmpty() //validate designation
	req.assert('salary1', 'salary is required').notEmpty() //validate salary
	req.assert('dateofjoining1', 'dateofjoining is required').notEmpty() //validate dateofjoining
	req.assert('city1', 'city is required').notEmpty() //validate city
	req.assert('Ename2', 'Ename is required').notEmpty()  //validate Ename
	req.assert('department2', 'Department is required').notEmpty() //validate department
	req.assert('designation2', 'Designation is required').notEmpty() //validate designation
	req.assert('salary2', 'salary is required').notEmpty() //validate salary
	req.assert('dateofjoining2', 'dateofjoining is required').notEmpty() //validate dateofjoining
	req.assert('city2', 'city is required').notEmpty() //validate city
	req.assert('Ename3', 'Ename is required').notEmpty()  //validate Ename
	req.assert('department3', 'Department is required').notEmpty() //validate department
	req.assert('designation3', 'Designation is required').notEmpty() //validate designation
	req.assert('salary3', 'salary is required').notEmpty() //validate salary
	req.assert('dateofjoining3', 'dateofjoining is required').notEmpty() //validate dateofjoining
	req.assert('city3', 'city is required').notEmpty() //validate city
	req.assert('Ename4', 'Ename is required').notEmpty()  //validate Ename
	req.assert('department4', 'Department is required').notEmpty() //validate department
	req.assert('designation4', 'Designation is required').notEmpty() //validate designation
	req.assert('salary4', 'salary is required').notEmpty() //validate salary
	req.assert('dateofjoining4', 'dateofjoining is required').notEmpty() //validate dateofjoining
	req.assert('city4', 'city is required').notEmpty() //validate city
	req.assert('Ename5', 'Ename is required').notEmpty()  //validate Ename
	req.assert('department5', 'Department is required').notEmpty() //validate department
	req.assert('designation5', 'Designation is required').notEmpty() //validate designation
	req.assert('salary5', 'salary is required').notEmpty() //validate salary
	req.assert('dateofjoining5', 'dateofjoining is required').notEmpty() //validate dateofjoining
	req.assert('city5', 'city is required').notEmpty() //validate city	
	var errors = req.validationErrors();
	if(!errors){ //Validation passed, since no errors were found
	var user = [{Ename: req.sanitize('Ename1').escape().trim(),
		department: req.sanitize('department1').escape().trim(),
		designation: req.sanitize('designation1').escape().trim(),
		salary: req.sanitize('salary1').escape().trim(),
		dateofjoining: req.sanitize('dateofjoining1').escape().trim(),
		city: req.sanitize('city1').escape().trim()},
		{Ename: req.sanitize('Ename2').escape().trim(),
		department: req.sanitize('department2').escape().trim(),
		designation: req.sanitize('designation2').escape().trim(),
		salary: req.sanitize('salary2').escape().trim(),
		dateofjoining: req.sanitize('dateofjoining2').escape().trim(),
		city: req.sanitize('city2').escape().trim()},
		{Ename: req.sanitize('Ename3').escape().trim(),
		department: req.sanitize('department3').escape().trim(),
		designation: req.sanitize('designation3').escape().trim(),
		salary: req.sanitize('salary3').escape().trim(),
		dateofjoining: req.sanitize('dateofjoining3').escape().trim(),
		city: req.sanitize('city3').escape().trim()},
		{Ename: req.sanitize('Ename4').escape().trim(),
		department: req.sanitize('department4').escape().trim(),
		designation: req.sanitize('designation4').escape().trim(),
		salary: req.sanitize('salary4').escape().trim(),
		dateofjoining: req.sanitize('dateofjoining4').escape().trim(),
		city: req.sanitize('city4').escape().trim()},
		{Ename: req.sanitize('Ename5').escape().trim(),
		department: req.sanitize('department5').escape().trim(),
		designation: req.sanitize('designation5').escape().trim(),
		salary: req.sanitize('salary5').escape().trim(),
		dateofjoining: req.sanitize('dateofjoining5').escape().trim(),
		city: req.sanitize('city5').escape().trim()}];
		req.db.collection('employee').insertMany(user, function(err, result){
		if(err){
			req.flash('error', err)
//render to views/employee/add.ejs
			res.render('employee/add', {
				title: 'Add new User',
				Ename: user.Ename,
				department: user.department,
				designation: user.designation,
				salary: user.salary,
				dateofjoining: user.dateofjoining,
				city: user.city
		})
		}else{
			req.flash('success', '5 records added successfully');
			
//redirect user to list page
			res.redirect('/users');
		}
		})
		}else {//Display errors to user
		var error_msg = '';
		errors.forEach(function(error){
			error_msg += error.msg + '<br>'
		})
			req.flash('error', error_msg)
			res.render('employee/add', {
				title: 'Add new Employee',
				Ename: req.body.Ename,
				department: req.body.department,
				designation: req.body.designation,
				salary: req.body.salary,
				dateofjoining: req.body.dateofjoining,
				city: req.body.city
		})
		}
		});
//Show edit employee form
app.get('/edit/(:id)', function(req, res, next){
	var oid = new ObjectId(req.params.id)
	req.db.collection('employee').find({"_id": oid}).toArray(function(err, result){
		if(err) return console.log(err)
//if employee not found
		if(!result){
			req.flash('error', 'User not found with id = ' + req.params.id);
			res.redirect('/users');
		}
		else { //if user found
// render to views/employee/edit.ejs template file
			res.render('employee/edit', {
			title: 'Edit User',
			id: result[0]._id,
			Ename: result[0].Ename,
			department: result[0].department,
			designation: result[0].designation,
			salary: result[0].salary,
			dateofjoining: result[0].dateofjoining,
			city: result[0].city
			})
		}
	})
})
//Edit employee post action
app.put('/edit/(:id)', function(req, res, next){
		req.assert('Ename', 'Ename is required').notEmpty(),
		req.assert('department', 'department is required').notEmpty(),
		req.assert('designation', 'designation is required').notEmpty(),
		req.assert('salary', 'salary is required').notEmpty(),
		req.assert('dateofjoining', 'dateofjoining is required').notEmpty(),
		req.assert('city', 'city is required').notEmpty()
		var errors = req.validationErrors()
		if(!errors) { //Validation passed, since no errors were found
		var user = {
			Ename: req.sanitize('Ename').escape().trim(),
			department: req.sanitize('department').escape().trim(),
			designation: req.sanitize('designation').escape().trim(),
			salary: req.sanitize('salary').escape().trim(),
			dateofjoining: req.sanitize('dateofjoining').escape().trim(),
			city: req.sanitize('city').escape().trim()
		}
			var oid= new ObjectId(req.params.id)
			req.db.collection('employee').update({"_id": oid}, user, function(err, result){
			if(err) {
			req.flash('error', err)
//render to views/employee/edit.ejs
			res.render('employee/edit', {
			title: 'Edit User',
			id: req.params.id,
			Ename: req.body.Ename,
			department: req.body.department,
			designation: req.body.designation,
			salary: req.body.salary,
			dateofjoining: req.body.dateofjoining,
			city: req.body.city
			})
			}else{
				req.flash('success', 'Record updated successfully')
				res.redirect('/users');
			}
			})
		}else { //Display errors to user
			var error_msg = '';
			errors.forEach(function(error){
				error_msg += error.msg + '<br>';
			})
			req.flash('error', error_msg)
			res.render('employee/edit', {
				title: 'Edit User',
				id: req.params.id,
				Ename: req.body.Ename,
				department: req.body.department,
				designation: req.body.designation,
				salary: req.body.salary,
				dateofjoining: req.body.dateofjoining,
				city: req.body.city
			})
		}
})
//Delete Employee
app.delete('/delete/(:id)', function(req, res, next){
		var oid = new ObjectId(req.params.id)
		req.db.collection('employee').remove({"_id": oid}, function(err, result)
		{
				if(err){
					req.flash('error', err)
//redirect user to list page
					res.redirect('/users');
				} else{
					req.flash('success', 'User deleted successfully! id = ' + req.params.id)
//redirect user to list page
					res.redirect('/users');
				}
			})
})
//Delete all Employees having designation "Developer"
app.delete('/delete/', function(req, res, next){
	req.db.collection('employee').remove({designation: "Developer"},function(err, result){
		if(err){
			req.flash('error',err)
			res.redirect('/users');
			}else{
			//render to views/employee/list.ejs template fileCreatedDate
			req.flash('success', 'Record/s having designation "Developer" were deleted successfully!' );
			res.redirect('/users');
			}
		})
	})

module.exports = app;