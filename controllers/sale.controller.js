var db = require('../db');

const getAllSales = (req, res) => {
    db.query(`SELECT * FROM sale_fur;`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getSaleById = (req, res) => {
    var id = req.params.id;
    db.query(`SELECT * FROM sale_fur where id_sale=${id};`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddSale = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var codeSale = req.body.codeSale;
    var startDate = req.body.startDate;
    var finishDate = req.body.finishDate;
    var precentSale = req.body.precentSale;

    db.query(`INSERT INTO sale (codeSale, startDate, finishDate, precentSale) VALUES (${codeRoom}, ${JSON.stringify(req.body.startDate)}, ${JSON.stringify(req.body.finishDate)}
    ,${precentSale})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteSale = (req, res) => {
    db.query(`DELETE FROM sale where codeSale=${req.body.codeSale}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdatePrecentSale = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE sale set precentSale =  ${precentSale(req.body.UpdatePrecentSale)} where codeRoom = ${req.body.codeRoom}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllSales,
    getSaleById,
    AddSale,
    DeleteSale,
    UpdatePrecentSale
};