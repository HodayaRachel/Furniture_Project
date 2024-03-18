var db = require('../db');

const GetCaegoriesAsPercentes = async (req, res) => {
    db.query(`select room_id, sum(room_id) from enteringcustomer where room_id=7 or room_id=8 or room_id=17 or room_id=18 or room_id=19 group by room_id;`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
}

module.exports =
    {
        GetCaegoriesAsPercentes
    };