const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const Post = require('../post/model').schema;
const StudentText = require('../studentText/model').schema;
const TeacherSchema = new Schema({
    Rating: Number,
    AreasOfInterest: [String],
    Posts: [{ type: ObjectId, ref: 'Post' }],
    Messages: [StudentText]

})

const Teacher = connection.model('Teacher', TeacherSchema);
module.exports = Teacher;