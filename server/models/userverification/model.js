const { Schema } = require('mongoose');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userVerificationSchema=new Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Date,
});
const userVerification=mongoose.model('userVerification', userVerificationSchema);
module.exports=userVerification;