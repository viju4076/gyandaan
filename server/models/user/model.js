const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
//const Post = require('../post/model').schema;
const AreasOfInterest = new Schema({
   
    id: Number,
    skill: String,
    isSelected: Boolean

})
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
    areasOfInterest: [AreasOfInterest],
    Posts: [{ type: ObjectId, ref: 'Post' }],
    qualifications: String
    
})

const User = connection.model('User', userSchema);
module.exports = User; 