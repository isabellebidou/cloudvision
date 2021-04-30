
const dbData = require("../dbdata");
const db = dbData.db;

async function getSampleItems() {
  return new Promise((resolve, reject) => {
    let sql = "select * FROM items LIMIT 3; ";
    db.query(sql, async (err, sampleItems) => {
      try {
        if (err) throw err;
        resolve(sampleItems);
      } catch (e) {
        console.error(e);
        reject({
          
        });
      }
    });
  });
}

module.exports = {
  getSampleItems
};
