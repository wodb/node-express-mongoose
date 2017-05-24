const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
	username:{type:String},
	password:{type:String},
	sex:{type:String},
	age:{type:String},
	address:{type:String}
},{versionKey:false})// 关闭版本锁

let userModel = mongoose.model('user',userSchema,'users')

module.exports = {
	userModel
}