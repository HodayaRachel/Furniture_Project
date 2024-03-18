
var db = require('../db');

const getAllFurniture = (req, res) => {
    db.query("SELECT * FROM furniture", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};




// const getFurnitureById = (req, res) => {
//     db.query(`SELECT * FROM furniture where codeFurToRoom=${req.params.id}`, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };
const getFurnitureByRoomId = (req, res) => {
    // console.log('Enter  getFurnitureById()');

    db.query(`SELECT * FROM furniture where room_id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getFurnitureById = (req, res) => {
    console.log('Enter  getFurnitureById()');

    db.query(`SELECT * FROM furniture where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};


const getFurnitureByColor = (req, res) => {
    console.log('params:', req.params);

    db.query(`SELECT * FROM furniture where color=${JSON.stringify(req.params.name)} and room_id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const filter = (req, res) => {
    db.query(`SELECT * FROM furniture where price<=${req.params.price} and room_id=${req.params.id}`, function (err, result, fields) {
        // SELECT * FROM furniture where price=${req.params.price}
        // SELECT * FROM furniture where price<=${req.params.price} and room_id=${req.params.id};

        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getFurnitureBySubRoom = (req, res) => {
    // console.log('Enter  getFurnitureById()');

    db.query(`SELECT * FROM furniture where sub_category=${req.params.id}`, function (err, result, fields) {
        // SELECT * FROM furniture where sub_category=333;

        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

// const AddFurniture = (req, res) => {
//     //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//     var codeFurToRoom = req.body.codeFurToRoom;
//     var room_id = req.body.room_id;
//     var Furniture_id = req.body.Furniture_id;
//     var color = req.body.color;
//     var price = req.body.price;
//     var nameFurniture = req.body.nameFurniture;
//     var describe_ = req.body.describe_;
//     var width = req.body.width;
//     var hight = req.body.hight;
//     var statusFur = req.body.statusFur;

//     // room_id, color, price, nameFurniture, describe_, width, hight, statusFur, image, sub_category) 
//     db.query(`INSERT INTO furniture (codeFurToRoom,room_id,Furniture_id , color ,price , nameFurniture, describe, width,hight,statusFur) 
//     VALUES (${codeFurToRoom},${room_id},${Furniture_id}, ${JSON.stringify(req.body.color)},${price},${JSON.stringify(req.body.nameFurniture)},${JSON.stringify(req.body.describe)},${width},${hight},${JSON.stringify(req.body.statusFur)})`, function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//             res.send(result);
//         });
// };

const AddFurniture = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    // var codeFurToRoom = req.body.codeFurToRoom;
    var room_id = req.body.room_id;
    // var Furniture_id = req.body.Furniture_id;
    var color = req.body.color;
    var price = req.body.price;
    var nameFurniture = req.body.nameFurniture;
    var describe_ = req.body.describe_;
    var width = req.body.width;
    var hight = req.body.hight;
    var statusFur = req.body.statusFur;
    var image = req.body.image;
    var sub_category = req.body.sub_category;


    db.query(`INSERT INTO furniture (room_id, color, price, nameFurniture, describe_, width, hight, statusFur, image, sub_category) 
    VALUES (${room_id},${JSON.stringify(req.body.color)},${price},${JSON.stringify(req.body.nameFurniture)},${JSON.stringify(req.body.describe_)},${JSON.stringify(req.body.width)},${JSON.stringify(req.body.hight)},${JSON.stringify(req.body.statusFur)},${JSON.stringify(req.body.image)},${sub_category})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteFurniture = (req, res) => {
    var Furniture_id = req.body.Furniture_id;

    db.query(`DELETE FROM furniture where id=${Furniture_id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};




const UpdateFurnitureName = (req, res) => {
    var Furniture_id = req.body.Furniture_id;

    var color = req.body.color;
    var price = req.body.price;
    var nameFurniture = req.body.nameFurniture;
    var statusFur = req.body.statusFur;

    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE furniture set nameFurniture =  ${JSON.stringify(req.body.nameFurniture)}, price=${price}, color=${JSON.stringify(req.body.color)}, statusFur=${JSON.stringify(req.body.statusFur)}  where id = ${req.body.Furniture_id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};


module.exports = {
    getAllFurniture,
    getFurnitureByRoomId,
    getFurnitureById,
    getFurnitureByColor,
    AddFurniture,
    DeleteFurniture,
    UpdateFurnitureName,
    filter,
    getFurnitureBySubRoom
};




