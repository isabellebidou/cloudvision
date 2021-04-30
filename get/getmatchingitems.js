const dbData = require("../dbdata");
const db = dbData.db;

function getMatchingItems(item, allItems) {
    console.log("getMatchingItems");
    console.log(item);
    console.log(item[0].red);
    console.log(allItems.length);
    //tbd

    // return new Promise((resolve, reject) => {

    //      db.query(sql, async (err, item) => {
    //        try {
    //          if (err) throw err;
    //          resolve(items);
    //        } catch (e) {
    //          console.error(e);
    //        }
    //      });
    //    });

}

module.exports = {
    getMatchingItems
};