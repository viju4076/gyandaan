const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema

const PostSchema = new Schema({
    senderId: ObjectId,
    Link: String,
    description: String,
    dateTime: String

})

const Post = connection.model('Post', PostSchema);
module.exports = Post;