
var db = require('../db');

const getAllEnteringcustomer = (req, res) => {
    db.query("SELECT * FROM enteringcustomer", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getEnteringCustomerById = (req, res) => {
    db.query(`SELECT * FROM enteringcustomer where codeEntering=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddEnteringcustomer = (req, res) => {
    var codeEntering = req.body.codeEntering;
    var customer_id = req.body.customer_id;
    var Furniture_id = req.body.Furniture_id;

    db.query(`INSERT INTO enteringcustomer (codeEntering, customer_id ,Furniture_id) VALUES (${codeEntering}, ${customer_id},${Furniture_id}})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteEnteringcustomer = (req, res) => {
    db.query(`DELETE FROM enteringcustomer where codeEntering=${req.body.codeEntering}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

/*const UpdateEnteringcustomer = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE enteringcustomer set codeEntering =  ${req.body.id} where codeCustomerDeal = ${req.body.codeCustomerDeal}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};*/
module.exports = {
    getAllEnteringcustomer,
    getEnteringCustomerById,
    AddEnteringcustomer,
    DeleteEnteringcustomer
    //UpdateEnteringcustomer
};

/*codeEntering` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `Furniture_id*/