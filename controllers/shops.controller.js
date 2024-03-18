var db = require('../db');

const getAllShops = (req, res) => {
    db.query("SELECT * FROM shops", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getShopById = (req, res) => {
    db.query(`SELECT * FROM shops where shopCode =${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddShop = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var shopCode = req.body.shopCode;
    var describeShop = req.body.describeShop;

    db.query(`INSERT INTO shops (shopCode, describeShop) VALUES (${shopCode}, ${JSON.stringify(req.body.describeShop)}})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteShop = (req, res) => {
    db.query(`DELETE FROM shop where shopCode=${req.body.shopCode}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateDescribeShop = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE shop set describeShop =  ${precentSale(req.body.UpdateDescribeShop)} where shopCode = ${req.body.shopCode}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllShops,
    getShopById,
    AddShop,
    DeleteShop,
    UpdateDescribeShop
};