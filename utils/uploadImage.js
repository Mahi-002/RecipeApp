const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

async function uploadImage(token, imageUrl) {
    // Assuming imageUrl is a base64 encoded string
    const buffer = Buffer.from(imageUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const key = `${uuid()}.jpg`; // Generate a unique filename
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    const { Location } = await s3.upload(params).promise();
    return Location; // Returns the URL of the uploaded image
}

module.exports = uploadImage;
