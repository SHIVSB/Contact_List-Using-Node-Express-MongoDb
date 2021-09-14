const express = require('express');
const path = require('path'); // path is an inbuilt module
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
const morgan = require('morgan')



// app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.static('assets'));

//middlewarefirst
// app.use(function(req,res,next){
//     req.myName = "Shivan"
//     console.log("First middleware called");
//     next();
// });

//middlewaresecond
// app.use(function(req,res,next){
//     console.log("My name is : " + req.myName);
//     // console.log("Second Middleware Called");
//     next();
// })

//to tell express that ejs will be our template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) // makes location dyanamic

var contactList = [
    {
        name: "Shivanshu",
        phone: "111111"
    },
    {
        name: "Shiv",
        phone: "222222"
    },
    {
        name: "Shivansh",
        phone: "333333"
    }
]

app.get('/', (req, res) => {
    // console.log(req.myName);

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts');
            return;
        }

        return res.render('home',
            {
                title: 'My Contacts List',
                contact_list: contacts
            });
    });

});
app.get('/practice', (req, res) => {
    return res.render('practice', {
        title: 'Lets practice with ejs'
    });
});

app.post('/create-contact', (req, res) => {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
            console.log("Error in creating new contact");
            return ;
        }else {
            console.log('*********', newContact);
            return res.redirect('/');
        }
    });
});

app.get('/delete-contact', (req,res) =>{
    // console.log(req.params);
    let id= req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting object");
            return;
        }else{
            return res.redirect('back');
        }

    });

});



app.listen(port, (req, res) => {
    console.log(`Server started on port : `, port);
});