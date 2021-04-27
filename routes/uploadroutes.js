

const express = require("express");
const router = express.Router();
const upload = require("../storage-config");
const multer = require('multer')
const uuid = require('uuis').v4

module.exports = router;

router.get("/uploadcsv",  function (req, res) {
  res.render('upload');

  });
  router.post("/uploadcsv", upload.single("csv"), (req, res) => {
    utils.log(req.file.originalname);
    utils.log(req.file.filename);
    var items = require(`../upload/${req.file.filename}`);
    
    for (i = 0; i < items.length; i++) {
      let product = items[i];//id;title;gender_id;composition;sleeve;photo;url
      let sql =
        'INSERT INTO items (id, title, gender_id, composition, sleeve, photo ,url) VALUES ("' +
        product.id +
        '","' +
        product.title +
        '","' +
        product.gender_id +
        '","' +
        product.composition +
        '","' +
        product.sleeve +
        '","' +
        product.photo +
        '","' +
        product.url +
        '");';
      db.query(sql, (err, res1) => {
        if (err) throw err;
        console.error(res1);
      });
    }
    //}
    try {
      fs.unlinkSync(`../upload/${req.file.filename}`);
    } catch (error) {
      console.error(error);
    }
  
    res.redirect("/");

  });

  module.exports = router;
  
