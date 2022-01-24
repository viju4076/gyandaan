const mongoose = require("mongoose");
const connection = require("../../config/database");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
//const Post = require('../post/model').schema;
const AreasOfInterest = new Schema({
  id: Number,
  skill: String,
  isSelected: Boolean,
});
const Rating = new Schema({
  rating: Number,
  description: String,
  senderId: ObjectId,
});
const userSchema = new Schema({
  username: String,
  email: String,
  phone: Number,
  hash: String,
  salt: String,
  followers: [ObjectId],
  following: [ObjectId],
  isTeacher: Boolean,
  Rating: [Rating],
  areasOfInterest: [AreasOfInterest],
  Posts: [{ type: ObjectId, ref: "Post" }],
  qualifications: String,
  globalRating: Number
});
userSchema.index({ "username": "text" });
const User = connection.model("User", userSchema);

module.exports = User;
