const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

let userSchema = new Schema({
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

userSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    getUserName(username) {
        return this.findOne({username})
        .exec()
    },
}
module.exports = mongoose.model('users', userSchema)