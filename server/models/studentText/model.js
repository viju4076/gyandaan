
//studentmessage : personal message to a teacher by student
const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema

const textSchema = new Schema({
    senderId: ObjectId,
    receiverId: ObjectId,
    heading: String,
    description: String,
    dateTime: String
})

const Text = connection.model('Text', textSchema);
module.exports = Text;