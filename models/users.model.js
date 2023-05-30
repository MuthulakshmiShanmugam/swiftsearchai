const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = user = mongoose.model("users", usersSchema);