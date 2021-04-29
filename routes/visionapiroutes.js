const express = require("express");
const router = express.Router();

router.get("/visioncall", function (req, res) {
    async function quickstart() {
        const vision = require('@google-cloud/vision');
        // Imports the Google Cloud client library
        // Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const fileName = '/Users/isabelle/cloudvision/resources/gallery.png';

// Performs property detection on the local file
const [result] = await client.imageProperties(fileName);
const colors = result.imagePropertiesAnnotation.dominantColors.colors;
colors.forEach(color => console.log(color));
      }
      quickstart();
    //res.render("visioncall");
  });


  module.exports = router;