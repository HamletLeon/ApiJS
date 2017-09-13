var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../entities/User');

router.post('/', function (req, res) {
	User.create({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	},
	function (err, user) {
		if (err) return res.status(500)
			.send("There was a problem adding the information to the database.");
		res.status(200).send(user);
	});
});

router.get('/', function (req, res) {
	User.find({}, function (err, users) {
		if (err) return res.status(500)
			.send("There was a problem finding the users");
		res.status(200).send(users);
	});
});

router.get('/User?', function (req, res) {
	if (req.query.id){
		User.findById(req.query.id, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem finding the user by ID");
			if (!user) return res.status(404).send("No user found.");
			res.status(200).send(user);
		})
	} else if (req.query.name){
		User.find({name: req.query.name}, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem finding the user by Name");
			if (!user) return res.status(404).send("No user found.");
			res.status(200).send(user);
		})
	} else res.status(500).send("Parameters are Empty");
});

router.put('/User?', function (req, res) {
	if (req.query.id){
		User.findByIdAndUpdate(req.query.id, req.body, {new: true}, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem updating the user by ID");
			res.status(200).send(user);
		})
	} /*else if (req.query.name){
		User.findAndUpdate({name: req.query.name}, req.body, {new: true}, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem updating the user by Name");
			res.status(200).send(user);
		})
	}*/ else res.status(500).send("Parameters are Empty");
});

router.delete('/User?', function (req, res) {
	if (req.query.id){
		User.findByIdAndRemove(req.query.id, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem deleting the user by ID");
			res.status(200).send(user);
		})
	} /*else if (req.query.name){
		User.find({name: req.query.name}, function (err, user) {
			if (err) return res.status(500)
				.send("There was a problem deleting the user by Name");
			res.status(200).send(user);
		})
	}*/ else res.status(500).send("Parameters are Empty");
});

module.exports = router;