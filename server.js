// importing Expres and Mongoose packages 
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//require('./initDB')();


//Connection to the database

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/gomycode`, { useNewUrlParser: true });

///////////////////////////////////////////////////////////////////////////////////////
/////// Add envdot net to hide mongodb user and pwd 
/////// link a html file for a GET reponse 
/////// seperate the database 
///////////////////////////////////////////////////////////////////////////////////////


// Members Schema from gomycode collection in the database
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema);

//returning Mebers first & Last Names after GET request

app.get('/', (req, res) => {
    Member.find({}, "firstName lastName").then(members => {
        if (members !== null && members.length > 0) {
            res.write(JSON.stringify(members));
        } else {
            res.write("No members found !!");
        }
        res.end();
    });
}).listen(8000);

