const { S3Client } = require("@aws-sdk/client-s3");
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path');

const port = 3000;
const app = express();
const s3 = new S3Client();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'takaitra-multer-s3',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

app.post('/upload', upload.single('photos'), function (req, res, next) {
    res.send('Successfully uploaded files!');
    console.dir(res);
})
app.use(express.static(path.join(__dirname, 'static')));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})