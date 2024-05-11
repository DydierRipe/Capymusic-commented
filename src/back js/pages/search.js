const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

// orders the items according to which matches the most with the search bar and the tags
const frecuencyOrdered = (arr) => {
    const frecuency = {};
  
    arr.forEach(obj => {
        const serializedObj = JSON.stringify(obj);
        frecuency[serializedObj] = (frecuency[serializedObj] || 0) + 1;
    });
  
    const result = [];
    for (const serializedObj in frecuency) {
        result.push({ 'item': JSON.parse(serializedObj), 'frecuency': frecuency[serializedObj] });
    }
  
    result.sort((a, b) => b.frecuency - a.frecuency);

    const orderedArr = [];
    for (let i = 0; i < result.length; i++) {
        orderedArr.push(result[i].item);
    }

    // final result to display in client
    return orderedArr;
}


const main = async (req) => {
    return await new Promise(async (res) => {

        // gets all the products matching with the search
        database.query(`select id, name, price, filters from products` + ((req.lim)? ` where name like "%${req.search}%"` : ``), async (e, resp) => {
            if (e) {
                res(["ERROR"]);
                throw e;
            }
            
            // if items are found
            if (resp.length > 0) { 
                
                for (const elem of resp) {
                    let result = await utilities.getImgExt(elem.id, path.join(__dirname + "../../../sources/productImages"));

                    // returns the imagen extension and inserts it in the object
                    if (result == 'not-found') {
                        let index = resp.indexOf(elem);
                        if (index != -1) {
                            resp.splice(index, 1);
                        }
                    } else {
                        elem.extension = result;
                    }
                }

                // filters the list according to the tags and categorizations 
                if (req.filters.length > 0) {
                    const filteredList = [];
                    for (const elem of resp) {
                        elem.filters = elem.filters.split(",");

                        for (const element of elem.filters) {
                            if (req.filters.includes(element)) {
                                filteredList.push(elem);
                            }
                        }
                    }
                    if (filteredList.length > 0) {
                        res(frecuencyOrdered(filteredList));
                    } else {
                        res(["NO DATA"]);
                    }
                } else {res(resp)};
            } else {res(["NO DATA"])};
        });
    });
}

const search = {}

search.main = main;

module.exports = search;