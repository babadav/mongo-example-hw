const express = require('express')
const app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');



var robotSchema = new mongoose.Schema({
	name: String,
	movement: String,
	literature: String,
	catchphrases: [String],
	url: String,
	evil: Boolean,
})
var Robot = mongoose.model('Robot', robotSchema);




app.get('/', (req, res) => res.send('Hello World!'))
app.get('/seed', function (req,res){

	var bender = new Robot({
		name: 'Bender Rodriguez',
		movement: 'Legs',
		literature: "Futurama",
		catchphrases: ["Bite my shiny metal ass", "We're boned"],
		url: "bender",
		evil: null,
	})
	bender.save(function (err) {
  		if (err) {
    		console.log(err);
  		} else {
    		console.log("Created ${bender.name}" + bender.catchphrases[0]);
  		}
	});

	var walle = new Robot({
		name: 'Wall-E',
		movement: 'Tracks',
		literature: "Wall-e",
		catchphrases: ["WWALLLLLEEEE"],
		url: "wale",
		evil: null,
	})
	walle.save(function (err) {
  		if (err) {
    		console.log(err);
  		} else {
    		console.log("Created ${walle.name}" + walle.catchphrases[0]);
  		}
	});

	var prawn = new Robot({
		name: 'Prawn',
		movement: 'Legs',
		literature: "District 9",
		catchphrases: ["Something Clever"],
		url: "prawn",
		evil: null,
	})
	prawn.save(function (err) {
  		if (err) {
    		console.log(err);
  		} else {
    		console.log("Created ${prawn.name}" + prawn.catchphrases[0]);
  		}
	});
	
	var steve = new Robot({
		name: 'steve',
		movement: 'Legs',
		literature: "stuff",
		catchphrases: ["Something Clever"],
		url: "steve",
		evil: null,
	})
	steve.save(function (err) {
  		if (err) {
    		console.log(err);
  		} else {
    		console.log("Created ${steve.name}" + steve.catchphrases[0]);
  		}
	});
	res.send('Seeded!')
})

app.get('/robots', function (req,res){
	Robot.find({}, function(err, robots){
		if (err){
			res.send(400, 'couldnt find robots');
		}else{
			console.log(err, robots)
			res.json(robots);
		}
		
	})
})

app.get('/robots/:url', function (req,res){

	Robot.findOne({url: req.params.url}, function(err, robot){
		if (err){
			res.send(400, 'couldnt find robot');
		}else if(!robot){
			res.send(400, 'couldnt find robot');
		}
		else{
			res.json(robot);
		}
		
	})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))





