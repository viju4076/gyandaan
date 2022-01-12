const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
//const Post = require('../post/model').schema;

const userSchema = new Schema({
    username: String,
    email: String,
    phone: Number,
    hash: String,
    salt: String,
    followers: [ObjectId],
    following: [ObjectId],
    isTeacher: Boolean,
    Rating: Number,
    AreasOfInterest: [String],
    Posts: [{ type: ObjectId, ref: 'Post' }],
    
})

const User = connection.model('User', userSchema);
module.exports = User; 