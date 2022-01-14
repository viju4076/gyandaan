const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema

const comments = new Schema({
    senderName: String,
    senderId: ObjectId,
     description: String,
    dateTime: String
})


const PostSchema = new Schema({
    name: String,
    senderId: ObjectId,
    heading:String,
    link: String,
    description: String,
    dateTime: Date,
    comments:[comments]
})

const Post = connection.model('Post', PostSchema);
module.exports = Post;