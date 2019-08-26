const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; 

 
const UserSchema = new Schema({
	username : {type : String, unique: true },
	password : String,
	consuming : Number, 
	member : Boolean, 
	lastuse : String 
}) ; 

const  User = mongoose.model('user' , UserSchema);

module.exports = User  ; 
