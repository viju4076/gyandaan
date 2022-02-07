const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const imagemin = import('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const isJpg = import('is-jpg');
const fs = require("fs");

dotenv.config();

// AWS CONFIG

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

// CONVERT TO JPG

const convertToJpg = async (input) => {
    if (isJpg(input)) {
        return input;
    }
    return sharp(input).jpeg().toBuffer();
};

// HELPER FUNCTION TO UPLOAD FILE TO AWS
const uploadSingleFile = async (file) => {
    // COMPRESS IMAGE FILE
    console.log(file.name);
    const uniqueId = uuidv4();
    const type = 'JPG';
    // PARAMS
    const fileParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uniqueId}_${file.name}`,
        Body: file.data
    };

    // UPLOAD TO AWS


    try {
        const fileRes = await s3.upload(fileParams).promise();
        return fileRes.Location;
    } catch (err) {
        console.log(err);
    }
};

const downloadFIle = async (link) => {
    console.log('dd');
    const url = await s3.getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: link,
    }).promise();
    return url.Body;
}



module.exports = { uploadSingleFile, downloadFIle };