const express = require("express");
const router = express.Router();
const getSampleItems = require("../get/getsampleitems");
const getAllItems = require("../get/getallitems");
const dbData = require("../dbdata");
var mysql = require("mysql");
const db = dbData.db;
const rgb2Hex = require("rgb-hex");


// the Vision detect image properties features can be used either against a local file or 
// a remote file. to use it against a remote file you need the reference of the bucket and 
// the path of the file in the bucket; unfortunately this is missing from the csv file
// for demonstration purposes I will be generating and persisting colors randomly for the entire
// catalogue.

router.get("/visioncall", function (req, res) {
  var items = [];
  async function quickstart() {
    try {
      // get a subset of the items stored in the database
      await getSampleItems
        .getSampleItems()
        .then ((resolveItems) =>  {
          items = resolveItems;

          const vision = require("@google-cloud/vision");
          const client = new vision.ImageAnnotatorClient();
          

          // Performs property detection on the local file for testing purposes
          // const fileName = '/Users/isabelle/cloudvision/resources/L1212_166_20.webp';
          // const [result] = await client.imageProperties(fileName);
          // const colors = result.imagePropertiesAnnotation.dominantColors.colors;
          // colors.forEach(color => console.log(color));


          // Performs property detection on the remote file
          items.forEach (async item => {
            try {
            // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
            // the 
            const bucketName = 'tbd';// the bucket data is missing from the database
            //const fileName = 'Path to file within bucket, e.g. path/to/image.png';
            const fileName = item.title;

            // const [result] = await client.imageProperties(
            //   `gs://${bucketName}/${fileName}`
            // );
            //const colors = result.imagePropertiesAnnotation.dominantColors.colors; 
             console.log(colors[0]);
            // to access descrete values
            // console.log(colors[0].color.red)
            // console.log(colors[0].color.green)
            // console.log(colors[0].color.blue)
            // console.log(colors[0].score)
            // console.log(colors[0].pixelFraction)
            } catch (error) {
              console.error(error)
            }
            
          });
        })
        .catch((error) => {
          console.error(error)
        });
      
    } catch (e) {
      console.error(e);
    }

  }
  quickstart();
});
// this endpoint is used in lieu of the /visioncall enpoint to generate and store dummy color data 
router.get("/visioncalldummy", function (req, res) {
  var items = [];
  const colors = require("../resources/dummy.js");
  console.log(colors[0]);
  async function quickstart() {
    try {
      await getAllItems
        .getAllItems()
        .then ((resolveItems) =>  {
          items = resolveItems;
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          let color = colors[Math.floor(Math.random() * colors.length)];
          var hex = `#${rgb2Hex(color.color.red,color.color.green,color.color.blue)}`;

          try {
            let sqlRed = "UPDATE items SET red  = '"+ color.color.red +"' WHERE id = '"+item.id+"'";
            let sqlGreen = "UPDATE items SET green  = '"+ color.color.green +"' WHERE id = '"+item.id+"'";
            let sqlBlue = "UPDATE items SET blue  = '"+ color.color.blue +"' WHERE id = '"+item.id+"'";
            let sqlHex = "UPDATE items SET hex = '"+ hex +"' WHERE id = '"+item.id+"'"; 
            db.query(sqlRed, (err, res1) => {
              if (err) throw err;
              console.error(res1);
            });
            db.query(sqlGreen, (err, res1) => {
              if (err) throw err;
              console.error(res1);
            });
            db.query(sqlBlue, (err, res1) => {
              if (err) throw err;
              console.error(res1);
            });
            db.query(sqlHex, (err, res1) => {
              if (err) throw err;
              console.error(res1);
            });
            } catch (error) {
              console.error(error)
            } 
        }     
        })
        .catch((error) => {
          console.error(error)
        });
      
    } catch (e) {
      console.error(e);
    }
  }
  quickstart();
});

module.exports = router;
