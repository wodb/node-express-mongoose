const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,// 不可重复约束
        require: true// 不可为空约束
    },
    password: {
        type: String,
        unique: true,// 不可重复约束
        require: true// 不可为空约束
    },
    sex: {
        type: String,
        unique: true,// 不可重复约束
        require: true// 不可为空约束
    },
    age: {
        type: String,
        unique: true,// 不可重复约束
        require: true// 不可为空约束
    },
    address: {
        type: String,
        unique: true,// 不可重复约束
        require: true// 不可为空约束
    }
}, {versionKey: false})// 关闭版本锁

let userModel = mongoose.model('user', userSchema, 'users')

module.exports = {
    userModel
}