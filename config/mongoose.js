//get library
const mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//chek if was successful
const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('Successfully connected to the database');
});
