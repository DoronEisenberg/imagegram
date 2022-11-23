const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8000 } = process.env;
const { getImage } = require("./db");
const { s3 } = require("./s3.js");
const fs = require("fs");
const db = require("./db");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./upload")));
app.use(express.json());

const multer = require("multer");
const uidSafe = require("uid-safe");

//save data to s3
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
        fileSize: 18097152,
    },
});

const aws = require("aws-sdk");
const { DataBrew } = require("aws-sdk");

//from db.js  get all images
app.get("/images", (req, res) => {
    getImage().then((result) => {
        //send result to browser
        return res.send(result);
    });
});

//from the upload form on the frontend, save the image to the database,
app.post("/images", uploader.single("file"), (req, res) => {
    console.log(req.file, "req file");
    console.log(req.body, "req body");

    //file data from the file input
    const { filename, mimetype, size, path } = req.file;

    //add the image to s3 bucket in amazon
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
            //if successful from amazon, save the image object to the image database
            console.log("success");
            db.addImage({
                //this is the url of the image file saved on amazon
                url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                title: req.body.title,
                description: req.body.description,
                username: req.body.username,
            });
            res.json({});
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
});

//add comment passing a comment, a username and a image id
app.post("/comments", (req, res) => {
    console.log("POST comments ", req.body);
    const { comment, username, image_id } = req.body;

    db.addComment({
        comment,
        username,
        image_id,
    }).then((lastComment) => {
        res.json(lastComment);
    });
});

//look into database for a comment with an image id of :imageId
app.get("/comments/:imageId", (req, res) => {
    console.log(req.params);
    const imageId = req.params.imageId;
    console.log("id", imageId);
    console.log("GET comments req body", req.body);
    db.getComments(imageId).then((result) => {
        return res.json(result);
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
