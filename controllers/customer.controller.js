var db = require('../db');
const { sendCopounOnCategory } = require("./cupon.js");

const getAllCustomer = (req, res) => {
    db.query("SELECT * FROM customer", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getCustomerById = (req, res) => {
    db.query(`SELECT * FROM customer where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const mailIntoDB = (req, res) => {
    db.query(`SELECT count(*) FROM customer where mail=${JSON.stringify(req.body.mail)}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddCustomer = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    // var id = req.body.id;
    var mail = req.body.mail;
    var nameCustomer = req.body.nameCustomer;
    var passwordCustomer = req.body.passwordCustomer;
    var phone = req.body.phone;
    var addressCustomer = req.body.addressCustomer;
    // (${id}
    db.query(`INSERT INTO customer (mail, nameCustomer, passwordCustomer,phone, addressCustomer) VALUES(${JSON.stringify(mail)}, ${JSON.stringify(nameCustomer)},${JSON.stringify(passwordCustomer)},${phone}, ${JSON.stringify(addressCustomer)})`
        , function (err, result, fields) {
            if (err) throw err;
            //  console.log(id);
            console.log(result);
            res.send(result);
        });
};

const DeleteCustomer = (req, res) => {
    db.query(`DELETE FROM customer where id=${req.body.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateNameCustomer = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE customer set nameCustomer =  ${JSON.stringify(req.body.UpdateNameCustomer)} where id = ${req.body.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const Login = (req, res) => {
    var mail = req.params.mail;
    var passwordCustomer = req.params.passwordCustomer;
    db.query(`SELECT * FROM customer where mail=${JSON.stringify(req.params.mail)} and passwordCustomer=${JSON.stringify(req.params.passwordCustomer)}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const Entering = (req, res) => {
    db.query(`Select roomName from rooms 
    inner join enteringcustomer on rooms.codeRoom = enteringcustomer.room_id
     where customer_id=${req.params.id} group by enteringcustomer.room_id order by codeEntering desc`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
// const AddEntry = (req, res) => {
//     var numOfEntering = 0;
//     var date = new Date();
//     let d = new Date()
//     let mySqlTimestamp = new Date(
//         d.getFullYear(),
//         d.getMonth(),
//         d.getDate(),
//         d.getHours(),
//         (d.getMinutes() + 30), // add 30 minutes
//         d.getSeconds(),
//         d.getMilliseconds()
//     ).toISOString().slice(0, 19).replace('T', ' ');
//     db.query(`select codeEntering from enteringcustomer where customer_id=${req.params.id} and room_id=${req.params.room_id} order by codeEntering desc limit 1 `, function (err, result, fields) {
//         if (err) throw err;
//         console.log('AddEntry:', result);
//         const data = Object.values(JSON.parse(JSON.stringify(result)));

//         numOfEntering = data.length > 0 ? data[0].codeEntering + 1 : 1;

//         db.query(`INSERT INTO enteringcustomer(codeEntering, customer_id, room_id, date_entering) VALUES (${numOfEntering}, ${req.params.id},${req.params.room_id},${mySqlTimestamp})`, function (errInsert, resultInsert) {
//             if (errInsert) throw errInsert;
//             console.log(resultInsert);
//             sendCopounOnRecentCategory(req.params.id, req.params.room_id);
//             res.send(resultInsert);
//         });

//     });
// }


const AddEntry = (req, res) => {
    var numOfEntering = 0;
    db.query(`select codeEntering from enteringcustomer where customer_id=${req.params.id} and room_id=${req.params.room_id} order by codeEntering desc limit 1 `, function (err, result, fields) {
        if (err) throw err;
        console.log('AddEntry:', result);
        const data = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(data + "data");
        numOfEntering = data.length > 0 ? data[0].codeEntering + 1 : 1;
        console.log(numOfEntering + "numOfEntering");
        console.log("now  " + new Date().toISOString().slice(0, 10));
        db.query(`INSERT INTO enteringcustomer(codeEntering, customer_id, room_id, date_entering) VALUES (${numOfEntering}, ${req.params.id}, ${req.params.room_id}, '${new Date().toISOString().slice(0, 10)}')`, function (errInsert, resultInsert) {
            if (errInsert) throw errInsert;
            console.log(resultInsert);
            sendCopounOnCategory(req.params.id, req.params.room_id);
            res.send(resultInsert);
        });
        // if (numOfEntering > 10) {
        // getCuponWhenEntry(req.params.id, req.params.room_id);
        // }
    });

}
// const Login = async function (req, res, next) {
//     var { mail, passwordCustomer } = req.body;
//     console.log("email", req.body)
//     var query = `SELECT kod_user, profil FROM users_tbl WHERE email = '${mail}' AND password= '${passwordCustomer}'`;
//     dbConnection.query(query, (err, response) => {
//         if (response.length > 0) {
//             console.log(" correct!!! ");
//             res.send(response);
//         }
//         else {
//             console.log(" wrong !!!");
//             res.send({ message: "The password/email is worng!!!" });
//         }
//     })
// }


module.exports = {
    getAllCustomer,
    getCustomerById,
    AddCustomer,
    DeleteCustomer,
    UpdateNameCustomer,
    Login,
    Entering,
    AddEntry,
    mailIntoDB
};