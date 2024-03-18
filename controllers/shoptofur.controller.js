var db = require('../db');

const getAllShoptofur = (req, res) => {
    db.query("SELECT * FROM shoptofur", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getShopToFurById = (req, res) => {
    db.query(`SELECT * FROM shoptofur where idShopToFur =${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddShopToFur = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var idShopToFur = req.body.idShopToFur;
    // var shop_id = req.body.shop_id;
    // var Furniture_id = req.body.Furniture_id;

    db.query(`INSERT INTO shoptofur (idShopToFur) VALUES (${idShopToFur})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteShopToFur = (req, res) => {
    db.query(`DELETE FROM shoptofur where shop_id=${req.body.shop_id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

// const UpdateDescribeShop = (req, res) => {
//     // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
//     db.query(`UPDATE shop set describeShop =  ${precentSale(req.body.UpdateDescribeShop)} where shopCode = ${req.body.shopCode}`, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };
module.exports = {
    getAllShoptofur,
    getShopToFurById,
    AddShopToFur,
    DeleteShopToFur

};