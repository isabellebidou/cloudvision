const express = require("express");
const router = express.Router();
const getSampleItems = require("../get/getsampleitems");
const getAppItems = require("../get/getallitems");

router.get("/visioncall", function (req, res) {
  var items = [];
  async function quickstart() {
    try {
      await getSampleItems
        .getSampleItems()
        .then ((resolveItems) =>  {
          items = resolveItems;
          const vision = require("@google-cloud/vision");
          // Imports the Google Cloud client library
          // Creates a client
          const client = new vision.ImageAnnotatorClient();
 
          items.forEach (async item => {
            try {
            // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
            const bucketName = 'tbd';
            //const fileName = 'Path to file within bucket, e.g. path/to/image.png';
            const fileName = item.title;
            //const [result] = await client.imageProperties(fileName);
            const [result] = await client.imageProperties(
              `gs://${bucketName}/${fileName}`
            );
            const colors = result.imagePropertiesAnnotation.dominantColors.colors; 
             console.log(colors[0]);
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
      
      // res.render("items", {
      //   items: items
      // });
    } catch (e) {
      console.error(e);
    }

  }
  quickstart();
  //res.render("visioncall");
});

module.exports = router;
