const mongoose = require("mongoose");
const autoIncrementModelID = require("./counter");

//let counter = 580;
//let counterId = {type:Number,default:()=>counter++};

var schema = new mongoose.Schema({
	truckNumber: {
		type: String
	},
	pickdate: {
		type: String
	}, deldate: {
		type: String
	},
	Truck: {
		type: String
	},
	Sender: {
		type: String
	},
	Receiver: {
		type: String
	},
	Status: {
		type: String
	},
	Addresssender: {
		type: String
	},
	Addressreceiver: {
		type: String

	},
	ConsignmentNumber: {
		type: String
	},
	Volume: {
		type: String
	},
	Summary: {
		type: String
	},
})

// schema.pre('save',function(next){
// 	if(!this.isNew){
// 		next();
// 		return;
// 	}
// 	autoIncrementModelID('activities',this,next);
// });

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;