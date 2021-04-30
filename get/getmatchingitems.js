const dbData = require("../dbdata");
const db = dbData.db;
const colourProximity = require("colour-proximity");

function getMatchingItems(item, allItems) {
  return new Promise((resolve, reject) => {
    const top5 = [];
    let itemProximity = new Map();
    for (let index = 0; index < allItems.length; index++) {
      const comparedItem = allItems[index];
      proximity = colourProximity.proximity(item[0].hex, comparedItem.hex);
      itemProximity.set(proximity, comparedItem);
    }
    mapSort(itemProximity);
    for (let index = 0; index < 5; index++) {
      var key = Array.from(itemProximity.keys())[index];
      top5.push(itemProximity.get(key));
    }
    resolve(top5);
  });
}
function mapSort(map) {
  let keys = [...map.keys()];
  // I used a technique to fix the default behaviour or Array.sort()  [1, 10, 12, 14, 2, 23...]
  // reference:  https://www.javascripttutorial.net/javascript-array-sort/
  let sortedKeys = keys.sort(function (a, b) {
    //decr
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });
  // I was inspired by the following https://stackoverflow.com/questions/31158902/is-it-possible-to-sort-a-es6-map-object/51242261
  // to sort the map
  sortedKeys.forEach((key) => {
    const value = map.get(key);
    map.delete(key);
    map.set(key, value);
  });
}

module.exports = {
  getMatchingItems,
};
