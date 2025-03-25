const mongoose = require("mongoose");
const {type} = require("os");

const schema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        reuired: true
    }, 
    password: {
        type: String,
        required: true
    }
});

const model = mongoose.model("details", schema);

module.exports = model;