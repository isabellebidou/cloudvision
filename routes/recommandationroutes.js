const express = require("express");
const router = express.Router();
//const getSampleItems = require("../get/getsampleitems");
const getAllItems = require("../get/getallitems");
const getItemById = require("../get/getItemById");
const getMatchingItems = require("../get/getmatchingitems");

router.get("/catalogue", async (req, res, next) => {
  let items = [];
  try {
    await getAllItems
      .getAllItems()
      .then((resolveItems) => {
        items = resolveItems;
      })
      .catch((error) => {
        console.error(error);
      });
    res.render("catalogue", {
      items: items,
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/item/:id", async function (req, res) {
  var id = req.params.id;
  await getItemById
    .getItemById(id)
    .then(async (resolveItem) => {
      var item = resolveItem;
      try {
        await getAllItems
          .getAllItems()
          .then(async (resolveAllItems) => {
            items = resolveAllItems;
            try {
                await getMatchingItems
                  .getMatchingItems(item, items)
                  .then((resolveMatchingItems) => {
                    const matchingItems = resolveMatchingItems;
                    try {
                        // res.render("item", {
                        //   item,
                        //   matchingItems
                        // });
                      } catch (e) {
                        console.error(e);
                        res.redirect("/");
                      }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                
              } catch (e) {
                console.error(e);
              }
          })
          .catch((error) => {
            console.error(error);
          });
        
      } catch (e) {
        console.error(e);
      }
      try {
      } catch (e) {
        console.error(e);
      }

    })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = router;
