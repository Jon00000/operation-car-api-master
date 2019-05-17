const mysql = require('./mysql/mysql');

//shopping cart initial data
const products = [{
    name: "Sledgehammer",
    price: 125.76,
    count: 1
}, {
    name: "Axe",
    price: 190.51,
    count: 3
}, {
    name: "Bandsaw",
    price: 562.14,
    count: 1
}, {
    name: "Chisel",
    price: 13.9,
    count: 2
}, {
    name: "Hacksaw",
    price: 19.45,
    count: 1
}];

/**
 * add
 * @param product 
 */
function addProduct(product) {
    //flat - first time added
    let flag = true;
    //whether items aleady in cart
    products.forEach(function (obj, i) {
        if (obj.name == product.name) {
            products[i].count += product.count;
            flag = false;
        }
    });
    //first time added 
    if (flag) {
        //add to cart
        products.push(product);
    }

    console.log('added success!');
}

/**
 * get all items in the cart
 */
function getProduct() {
    // if there is items in the cart
    if (products.length > 0) {
        console.log('------shoping cart list------');
        products.forEach(function (obj, i) {
            console.log(i + 1 + '.' + obj.name + '  ' + obj.price + ' NZD  ' + obj.count);
        });
        return true;
    } else {
        console.log('------no data------');
        return false;
    }
}

/**
 * remove the item
 * @param index
 */
function delProduct(index) {
    //validate index
    if (index <= products.length) {
        
        products.splice(index - 1, 1);
        console.log('removed!');
        return true;
    } else {
        //illegal index
        return false;
    }
}

/**
 * Item data persistence 
 * @param data
 */
function saveProduct(data) {
    let sql = "insert into car(name,price,count) values(?,?,?)";
    let p = [data.name, data.price, data.count];
    mysql.exec(sql, p, function (err, r) {
        if (err) {
            return false;
        } else {
            if (r.insertId != 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}

/**
 * get persistence item
 */
function selectProduct() {
    let sql = "select * from car";
    mysql.exec(sql, null, function (err, r) {
        return JSON.stringify(r);
    });
}

/**
 * delete persistence item
 * @param id
 */
function deleteProduct(id) {
    let sql = "delete from car where id=?";
    let p = [id];
    mysql.exec(sql, p, function (err, r) {
        if (err) {
            return false;
        } else {
            if (r.affectedRows == 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}

//export modules
module.exports = { addProduct, getProduct, delProduct };