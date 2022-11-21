const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8000 } = process.env;
const { getImage } = require("./db");
const { s3 } = require("./s3.js");
const fs = require("fs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./upload")));
app.use(express.json());

const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const aws = require("aws-sdk");
app.get("/images", (req, res) => {
    getImage().then((result) => {
        return res.send(result);
    });
});

app.post("/images", uploader.single("file"), (req, res) => {
    console.log(req.file, "req file");

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("success");
            // it worked!!!
            res.json({});
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
