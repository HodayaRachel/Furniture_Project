
var db = require('../db');

const getAllDeal = (req, res) => {
    db.query("SELECT * FROM deal", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getDealById = (req, res) => {
    db.query(`SELECT * FROM deal where codeCustomerDeal=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddDeal = (req, res) => {
    var codeCustomerDeal = req.body.codeCustomerDeal;
    var customer_id = req.body.customer_id;
    var dealDate = req.body.dealDate;
    var codeFurToRoom_id = req.body.codeFurToRoom_id;
    var amount = req.body.amount;
    var sumToPay = req.body.sumToPay;

    db.query(`INSERT INTO deal (codeCustomerDeal ,customer_id ,dealDate ,codeFurToRoom_id ,amount ,sumToPay) VALUES 
    (${codeCustomerDeal}, ${customer_id},${JSON.stringify(req.body.dealDate)},${codeFurToRoom_id},${amount},${sumToPay})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteDeal = (req, res) => {
    db.query(`DELETE FROM deal where codeCustomerDeal=${req.body.codeCustomerDeal}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateDeal = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE deal set sumToPay =  ${req.body.sumToPay} where codeCustomerDeal = ${req.body.codeCustomerDeal}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllDeal,
    getDealById,
    AddDeal,
    DeleteDeal,
    UpdateDeal
};

