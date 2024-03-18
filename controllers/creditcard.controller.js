
var db = require('../db');

const getAllCreditcard = (req, res) => {
    db.query("SELECT * FROM creditcard", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getCreditcardById = (req, res) => {
    db.query(`SELECT * FROM creditcard where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddCreditcard = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var id = req.body.id;
    var customer_id = req.body.customer_id;
    var numCard = req.body.numCard;
    var validity = req.body.validity;
    var cvv = req.body.cvv;
    var tz = req.body.tz;


    db.query(`INSERT INTO creditcard (id, customer_id, numCard, validity, cvv, tz) VALUES 
    (${id}, ${customer_id},${numCard}, ${JSON.stringify(req.body.validity)},${cvv}, ${tz})`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
};

const DeleteCreditcard = (req, res) => {
    db.query(`DELETE FROM creditcard where id=${req.body.codeRoom}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateCreditcard = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE creditcard set numCard  = ${req.body.numCard}validity =${req.body.validity}cvv = ${req.body.cvv}tz = ${req.body.tz}customer_id =  ${customer_id} where customer_id = ${req.body.customer_id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllCreditcard,
    getCreditcardById,
    AddCreditcard,
    DeleteCreditcard,
    UpdateCreditcard
};