const userService = require("../services/users.services");
const AppError = require("../helpers/appError");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const apiGetAllUser = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        if (!users) {
            res.status(404).json("There are no users found yet!");
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const apiGetUsersById = async (req, res, next) => {
    try {
        let id = req.params.id || {};
        const user = await userService.getaUserbyId(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
const apiCheckUser = async (req, res, next) => {
    try {
        // let email = req.body.email || {};
        // let password = req.body.password || {};
        const user = await userService.userLogin(req.body);
        if (user.length > 0) {
            const validPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (validPassword) {
                res.status(200).json(
                    { "username": user[0].username, "user_email": user[0].email, "user_token": await userService.generateToken(user[0]._id) });
                // token: await adminService.generateToken(admin[0]._id),

            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(400).json({ error: "Invalid email" });
        }
        //  res.json();
    } catch (error) {
        res.status(500).json({ error });
    }
}

const apiCreateUser = async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.body) return next(new AppError("No form data found", 404));
        const checkEmail = await userService.getEmailId(req.body);
        console.log(checkEmail);
        if (checkEmail.length == 0) {
            const createdUser = await userService.createUser(req.body);
            res.json({
                username: createdUser.username,
                user_email: createdUser.email,

            });
        } else {
            res.status(400).json({ error: "Email Id already available" })
        }



    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    apiGetAllUser,
    apiCreateUser,
    apiGetUsersById,
    apiCheckUser
}



