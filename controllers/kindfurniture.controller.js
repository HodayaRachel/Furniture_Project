
var db = require('../db');

const getAllKindfurniture = (req, res) => {
    db.query("SELECT * FROM kindfurniture", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getKindfurnitureById = (req, res) => {
    db.query(`SELECT * FROM kindfurniture where codeFurniture=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddKindfurniture = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var codeFurniture = req.body.codeFurniture;
    var furnitureName = req.body.furnitureName;

    db.query(`INSERT INTO kindfurniture (codeFurniture, furnitureName) VALUES (${codeFurniture}, ${JSON.stringify(req.body.furnitureName)})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteKindfurniture = (req, res) => {
    db.query(`DELETE FROM kindfurniture where codeFurniture=${req.body.codeFurniture}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateKindfurnitureName = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE kindfurniture set furnitureName =  ${JSON.stringify(req.body.UpdateKindfurnitureName)} where codeFurniture = ${req.body.codeFurniture}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllKindfurniture,
    getKindfurnitureById,
    AddKindfurniture,
    DeleteKindfurniture,
    UpdateKindfurnitureName
};



