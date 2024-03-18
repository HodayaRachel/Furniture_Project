const router = require("express").Router();
const { getAllRooms, getRoomById, getRoomNameByFurnitureId, getRoomByRoomName, AddRoom, DeleteRoom, UpdateRoomName } = require("../controllers/room.controller")
const { getAllCustomer, getCustomerById, AddCustomer, DeleteCustomer, UpdateNameCustomer, mailIntoDB, Login, Entering, AddEntry } = require("../controllers/customer.controller")
const { getAllCreditcard, getCreditcardById, AddCreditcard, DeleteCreditcard, UpdateCreditcard } = require("../controllers/creditcard.controller")
const { getAllDeal, getDealById, AddDeal, DeleteDeal, UpdateDeal } = require("../controllers/deal.controller")
const { getAllEnteringcustomer, getEnteringCustomerById, AddEnteringcustomer, DeleteEnteringcustomer } = require("../controllers/enteringcustomer.controller")
const { getAllFurniture, getFurnitureByRoomId, getFurnitureById, getFurnitureByColor, AddFurniture, DeleteFurniture, UpdateFurnitureName, filter, getFurnitureBySubRoom } = require("../controllers/furniture_.controller")
const { getAllKindfurniture, getKindfurnitureById, AddKindfurniture, DeleteKindfurniture, UpdateKindfurnitureName } = require("../controllers/kindfurniture.controller")
const { getAllSales, getSaleById, AddSale, DeleteSale, UpdatePrecentSale } = require("../controllers/sale.controller")
const { getAllShops, getShopById, AddShop, DeleteShop, UpdateDescribeShop } = require("../controllers/shops.controller")
const { getAllShoptofur, getShopToFurById, AddShopToFur, DeleteShopToFur } = require("../controllers/shoptofur.controller")
const { SEND_EMAIL } = require("../controllers/mail")
const { sendCopounOnCategory, getCuponById, UpdateCuponStatus } = require("../controllers/cupon")
const { GetCaegoriesAsPercentes } = require('../controllers/stats.controller');

router.post("/UpdateCuponStatus", UpdateCuponStatus);
// router.get("/SEND_EMAIL/:mail/:subject/:text", SEND_EMAIL);

router.get("/getStats", GetCaegoriesAsPercentes);

router.get("/addEntry/:id/:room_id", AddEntry);

router.get("/getAllRooms", getAllRooms);
router.get("/getRoomById/:id", getRoomById);
router.get("/getRoomNameByFurnitureId/:id", getRoomNameByFurnitureId)
router.get("/getRoomByRoomName/:roomName", getRoomByRoomName);

router.post("/AddRoom", AddRoom);
router.post("/DeleteRoom", DeleteRoom);
router.post("/UpdateRoom", UpdateRoomName);

router.get("/getAllCustomer", getAllCustomer);
router.get("/getCustomerById/:id", getCustomerById);
router.post("/AddCustomer", AddCustomer);
router.post("/DeleteCustomer", DeleteCustomer);
router.post("/UpdateNameCustomer", UpdateNameCustomer);
router.get("/Login/:mail/:passwordCustomer", Login);
router.get("/Entering/:id", Entering);
router.get("/mailIntoDB", mailIntoDB);

router.get("/getAllCreditcard", getAllCreditcard);
router.get("/getCreditcardById", getCreditcardById);
router.post("/AddCreditcard", AddCreditcard);
router.post("/DeleteCreditcard", DeleteCreditcard);
router.post("/UpdateCreditcard", UpdateCreditcard);

router.get("/getAllDeal", getAllDeal);
router.get("/ getDealById", getDealById);
router.post("/AddDeal", AddDeal);
router.post("/DeleteDeal", DeleteDeal);
router.post("/UpdateDeal", UpdateDeal);

router.get("/getAllEnteringcustomer", getAllEnteringcustomer);
router.get("/ getEnteringCustomerById", getEnteringCustomerById);
router.post("/AddEnteringcustomer", AddEnteringcustomer);
router.post("/DeleteEnteringcustomer", DeleteEnteringcustomer);

router.get("/getAllFurniture", getAllFurniture);

router.get("/getFurnitureByRoomId/:id", getFurnitureByRoomId);

router.get("/getFurnitureById/:id", getFurnitureById);
router.get("/getFurnitureByColor/:id/:name", getFurnitureByColor);

router.post("/AddFurniture", AddFurniture);
router.post("/DeleteFurniture/:id", DeleteFurniture);
router.post("/UpdateFurnitureName", UpdateFurnitureName);
router.get("/filter/:price/:id", filter);
router.get("/getFurnitureBySubRoom/:id", getFurnitureBySubRoom);

// router.get("/getRoomById/:id", getRoomById);

router.get("/getAllKindfurniture", getAllKindfurniture);
router.get("/ getKindfurnitureById", getKindfurnitureById);
router.post("/AddKindfurniture", AddKindfurniture);
router.post("/DeleteKindfurniture", DeleteKindfurniture);
router.post("/UpdateKindfurnitureName", UpdateKindfurnitureName);

router.get("/getAllSales", getAllSales);
router.get("/getSaleById/:id", getSaleById);

router.post("/AddSale", AddSale);
router.post("/DeleteSale", DeleteSale);
router.post("/UpdatePrecentSale", UpdatePrecentSale);

router.get("/getAllShops", getAllShops);
router.get("/ getShopById", getShopById);
router.post("/AddShop", AddShop);
router.post("/DeleteShop", DeleteShop);
router.post("/UpdateDescribeShop", UpdateDescribeShop);

router.get("/getAllShoptofur", getAllShoptofur);
router.get("/ getShopToFurById", getShopToFurById);
router.post("/AddShopToFur", AddShopToFur);
router.post("/DeleteShopToFur", DeleteShopToFur);

router.post("/SEND_EMAIL", SEND_EMAIL);

router.get("/sendCopounOnCategory/:cust_id/:room_id", sendCopounOnCategory);
router.get("/getCuponById/:cupon_id/:mail", getCuponById);

module.exports = router;