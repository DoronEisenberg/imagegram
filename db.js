const spicedPg = require("spiced-pg");
require("dotenv").config();

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${process.env.USER}:${process.env.PASS}@localhost:5432/${process.env.DATABASE}`
);

//frmo table images select all and return all rows
module.exports.getImage = () => {
    return db.query("SELECT * FROM images").then((result) => result.rows);
};

module.exports.addImage = ({ url, username, title, description }) => {
    return db
        .query(
            `INSERT INTO images (url, username, title, description)
             VALUES  ($1, $2, $3, $4)
             RETURNING*`,
            [url, username, title, description]
        )
        .then((result) => result.rows[0]);
};

module.exports.getComments = (image_id) => {
    return db
        .query(
            `SELECT * FROM comments
   WHERE image_id = $1`,
            [image_id]
        )
        .then((result) => {
            console.log("result getComments", result.rows);

            return result.rows;
        });
};

//adding into comments for current image
module.exports.addComment = ({ comment, username, image_id }) => {
    return db
        .query(
            `INSERT INTO comments (comment, username, image_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
            [comment, username, image_id]
        )
        .then((result) => {
            console.log("result addComment", result.rows[0]);
            return result.rows[0];
        });
};
