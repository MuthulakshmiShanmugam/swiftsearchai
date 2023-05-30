const users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const getAllUsers = async () => {
    try {
        const allUsers = await users.find();
        return allUsers;
    } catch (error) {
        console.log(`Could not fetch users ${error}`)
    }
}

const createUser = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(data.password, salt);
        const newUser = {
            username: data.username,
            email: data.email,
            password: hashpassword
        }
        const response = await new users(newUser).save();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getEmailId = async (data) => {
    try {
        const findEmail = await users.find({ email: data.email });
        return findEmail




    } catch (error) {
        console.log(`email not found ${error}`);

    }
}

const userLogin = async (data) => {
    try {
        const checkUser = await users.find({ email: data.email });
        return checkUser;
    } catch (error) {
        console.log(`user not found. ${error}`)
    }
}

const getaUserbyId = async (userId) => {
    try {
        const singleUserResponse = await users.findById({ _id: userId });
        return singleUserResponse;
    } catch (error) {
        console.log(`user not found. ${error}`)
    }
}


// Generate JWT
const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: '10d',
    })
}

module.exports = {
    getAllUsers,
    createUser,
    userLogin,
    getaUserbyId,
    generateToken,
    getEmailId
}

