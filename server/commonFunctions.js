const fs = require('fs');
const {GOODS_PATH, BASKET_GOODS_PATH} = require('./constants');


const readItems = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
};
// readItems(GOODS_PATH).then((items) => {
//     console.log(items);
// });
const arr = [        
    {
    uin: "pr1",
    group: "milkProd",
    name: "Молоко",
    price: 60,
    img: "/src/catalog/images/pr1.jpg"
    }
];

const writeItems = function(path, items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(items), (err) => {
            if (err) {
                reject(err);
            }
            resolve(items);
        });
    });
};

const addItems = (path, item) => {
    return new Promise((resolve, reject) => {
        readItems(path).then((items) => {
            const resultItem = [...items];
            resultItem.push(item);
            writeItems(path, resultItem).then((_resultItem) => {
                resolve(_resultItem);
            }).catch((err) => {
                reject(err);
            });
       });
    });
};

module.exports = {addItems};

// addItems(BASKET_GOODS_PATH, {id: 1, name: 'name', price: 270});