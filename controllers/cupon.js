
const { SEND_EMAIL } = require("./mail.js");
var setSql = `SET SQL_SAFE_UPDATES=0;`
var db = require('../db');

const getCuponById = (req, res) => {
    var cupon_id = req.params.cupon_id;
    db.query(`select cupon_to_cust.id, cust_id, cupon_date, cupon_id, mail, nameCustomer  from cupon_to_cust join customer where cupon_id=${req.params.cupon_id} and mail=${JSON.stringify(req.params.mail)} and cupon_status=1 and cust_id=customer.id;`, function (err, result, fields) {

        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateCuponStatus = (req, res) => {
    var cupon_id = req.body.id;
    db.query(`UPDATE cupon_to_cust set cupon_status = 0 WHERE cupon_to_cust.id = ${cupon_id};`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

/*
Send cupon to user algorithm:
- get customer id and category id from the client side
- check if user can get the cupon:
   - user has nore than x entries for the specific category in y period of time
    for example: x = 7, y = 14 
    if user has moer that 7 eneries in the past 14 days
    - user didnt get copun in z period of time
      for example: z = 3 months
      user didn't get cupon in the past 3 months
*/

const IsAllEntriesOnXTime = async (cust_id, room_id) => {
    var sql = `select count(*) as 'count' from enteringcustomer where customer_id = ${cust_id} and room_id = ${room_id} and DATEDIFF(date_entering, now()) <=14`;
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(rows)));

        var ret = result[0].count > 7 == true ? true : false;
        console.log(`return value from IsAllEntriesOnXTime: ${ret}`);
        return ret;
    });
}

const IsFirstTime = async (cust_id, cupon_id) => {
    var sql = `select count(*) as 'count' from cupon_to_cust where cust_id = ${cust_id} and cupon_id = ${cupon_id}`;
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        var ret = (result[0].count == 0) == true ? true : false;
        return ret;
    });
}

const IsGetBeforeXTime = (cust_id, cupon_id) => {
    var sql = `select count(*) as 'count' from cupon_to_cust where cupon_date >= DATE(NOW() - INTERVAL 3 MONTH) and  cust_id = ${cust_id} and cupon_id = ${cupon_id}`;
    db.query(sql, function (err, rows) {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(rows)));

        var ret = result[0].count > 0 == true ? true : false;
        return ret;
    });
}

const CanGetCupon = async (cust_id, cupon_id) => {

    var sql = `select count(*) from cupon_to_cust where cupon_date >= DATE(NOW() - INTERVAL 3 MONTH) and  cust_id = ${cust_id} and cupon_id = ${cupon_id}`;
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        var ret = result[0].count > 0 == true ? true : false;

        var sql2 = `select count(*) from enteringcustomer where customer_id = ${cust_id} and room_id = ${cupon_id} and DATEDIFF(date_entering, now()) <=14`;
        db.query(sql2, function (err, rows) {
            if (err) throw err;
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            var ret2 = result[0].count > 7 == true ? true : false;


            console.log(`return value : ${ret} ${ret2}`);
            if (ret == false && ret2 == true) {
                db.query(`SELECT * FROM customer where id=${cust_id}`, function (err, rows) {
                    if (err) throw err;
                    const customer_result = Object.values(JSON.parse(JSON.stringify(rows)));

                    db.query(`select roomName from furniture.rooms where codeRoom = ${cupon_id}`, function (err, rows) {
                        if (err) throw err;
                        const category_result = Object.values(JSON.parse(JSON.stringify(rows)));
                        sendEmailWrapper(customer_result, category_result)
                        console.log('sent cupon successfully');
                        db.query(`INSERT INTO cupon_to_cust (cust_id, cupon_date, cupon_id, cupon_status) VALUES (${cust_id}, '${new Date().toISOString().slice(0, 10)}', ${cupon_id}, 1)`, function (err, rows) {
                            if (err) throw err;
                        });
                    });
                });
            }
        });
    });

    // var b = IsAllEntriesOnXTime(cust_id, cupon_id).then(res => console.log('isAllEntriesOnXTime', isAllEntriesOnXTime));
    //console.log(`return value from CanGetCupon: ${isGetBeforeXTime} - ${isAllEntriesOnXTime}`);


    // return a == false && b == true;
}


/*
function cbToPromise(asyncFunc, ...params) {
    return new Promise((resolve, reject) => {
        asyncFunc(...params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

try {
    const result = await cbToPromise(redisClient.flushall);
    return result == 'OK';
}
catch(err) {
    console.error(err);
} 
*/

const sendCopounOnCategory = (cust_id, room_id) => {
    console.log(`customer id: ${cust_id} , category id: ${room_id}`);
    CanGetCupon(cust_id, room_id);
};

const sendEmailWrapper = (customer, category) => {
    const getRoomName = () => {
        switch (roomName) {
            case 'חדרי שינה':
                return 'bed_room';
            case 'חדרי ילדים':
                return 'kids_room';
            case 'מערכות ישיבה':
                return 'living_room';
            case 'ספריות קודש':
                return 'libraries';
            default:
                break;
        }
    }

    console.log('Enter sendEmailWrapper()');

    var to = customer[0].mail;
    var subject = `${category[0].roomName} קבל קופון על קטגוריית  `;
    var text = ` ${customer[0].nameCustomer} היי `;
    SEND_EMAIL({ to, subject, text });
};

module.exports = { sendCopounOnCategory, getCuponById, UpdateCuponStatus };
