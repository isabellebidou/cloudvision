
const dbData = require("../dbdata");
const db = dbData.db;

async function getAllItems() {
  return new Promise((resolve, reject) => {
    let sql = "select * FROM items; ";
    db.query(sql, async (err, items) => {
      try {
        if (err) throw err;
        resolve(items);
      } catch (e) {
        console.error(e);
        reject({       
        });
      }
    });
  });
}

module.exports = {
  getAllItems
};
