const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema

const comments = new Schema({
    senderId: ObjectId,
     description: String,
    dateTime: String
})


const PostSchema = new Schema({
    senderId: ObjectId,
    link: String,
    description: String,
    dateTime: String,
    comments:[comments]
})

const Post = connection.model('Post', PostSchema);
module.exports = Post;