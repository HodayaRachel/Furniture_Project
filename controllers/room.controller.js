
var db = require('../db');

const getAllRooms = (req, res) => {
    db.query("SELECT * FROM rooms", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getRoomById = (req, res) => {
    db.query(`SELECT * FROM rooms where codeRoom=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

// const getRoomNameByFurnitureId = (req, res) => {
//         db.query(`select roomName from rooms join furniture where furniture.id=${req.params.id} and room_id=codeRoom;`, function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//             res.send(result);
//         });
//     };


const getRoomNameByFurnitureId = (req, res) => {
    db.query(`select * from rooms join furniture where id=${req.params.id} and room_id=codeRoom;`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getRoomByRoomName = (req, res) => {
    db.query(`SELECT * FROM rooms where roomName=${JSON.stringify(req.params.roomName)}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddRoom = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    var codeRoom = req.body.codeRoom;
    var roomName = req.body.roomName;

    db.query(`INSERT INTO rooms (codeRoom, roomName) VALUES (${codeRoom}, ${JSON.stringify(req.body.roomName)})`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const DeleteRoom = (req, res) => {
    db.query(`DELETE FROM rooms where codeRoom=${req.body.codeRoom}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const UpdateRoomName = (req, res) => {
    // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
    db.query(`UPDATE rooms set roomName =  ${JSON.stringify(req.body.updatedRoomName)} where codeRoom = ${req.body.codeRoom}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
module.exports = {
    getAllRooms,
    getRoomById,
    getRoomNameByFurnitureId,
    getRoomByRoomName,
    AddRoom,
    DeleteRoom,
    UpdateRoomName
};