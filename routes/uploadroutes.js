const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}
const router = express.Router();
const upload = require("../storage-config");
const parse = require("csv-parse");
const fs = require("fs");
//const items = [];
const dbData = require("../dbdata");
//var mysql = require("mysql");
const db = dbData.db;

router.get("/uploadcsv", function (req, res) {
  res.render("upload");
});
router.post("/uploadcsv", upload.single("csv"), (req, res) => {
  console.log(req.file.originalname);
  console.log(req.file.filename);
  try {
    fs.createReadStream(`./upload/./${req.file.filename}`)
      .pipe(
        parse({
          delimiter: ";",
        })
      )
      .on("data", (datarow) => {
        var item = {
          id: datarow[0],
          title: datarow[1],
          gender_id: datarow[2],
          composition: datarow[3],
          sleeve: datarow[4],
          photo: datarow[5],
          url: datarow[6],
        };

        let sql =
          'INSERT INTO items (id, title, gender_id, composition, sleeve, photo ,url) VALUES ("' +
          item.id +
          '","' +
          item.title +
          '","' +
          item.gender_id +
          '","' +
          item.composition +
          '","' +
          item.sleeve +
          '","' +
          item.photo +
          '","' +
          item.url +
          '");';
        db.query(sql, (err, res1) => {
          if (err) throw err;
          console.error(res1);
        });

        //items.push(item);
      })
      .on("end", () => {
        try {
          fs.unlinkSync(`./upload/./${req.file.filename}`);
        } catch (error) {
          console.error(error);
        }
      });
  } catch (error) {
    console.error(error);
  }

  res.redirect("/");
});

module.exports = router;
