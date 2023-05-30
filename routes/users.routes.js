const { Router } = require('express');


const router = Router();

// const express = require("express");
// const router = express.Router();
const usersCtrl = require("../controllers/users.controller");
const { protect } = require("../middlewares/users.middleware");


// admin routes
router.get("/", protect, usersCtrl.apiGetAllUser);
router.post("/login", usersCtrl.apiCheckUser);
router.post('/register', usersCtrl.apiCreateUser);
router.get("/:id", usersCtrl.apiGetUsersById);




module.exports = router;