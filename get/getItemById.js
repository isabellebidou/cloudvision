const dbData = require("../dbdata");
const db = dbData.db;

function getItemById(id) {

    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM items WHERE id = "' + id +'" ;';
         db.query(sql, async (err, item) => {
           try {
             if (err) throw err;
             resolve(item);
           } catch (e) {
             console.error(e);
           }
         });
       });

}

module.exports = {
    getItemById,
};