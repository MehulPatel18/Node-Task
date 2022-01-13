const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const db = require('./config/mongoose');
const path = require('path');
const authcontrol = require('./controllers/auth');

const viewsPath =  path.join(__dirname, './views');

app.set('views', viewsPath);

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');




app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/auth/signup", function (req, res) {
    res.render('registration')
});

app.get("/login", function (req, res) {
    res.render('login')
});

app.use('/api', require('./routes'));

app.get("/api/auth/getuser", function (req, res) {
    const data = authcontrol.getuser();
    console.log("response:>>>", data);
    res.render('userinfo', {
        res: res
    })
});

app.listen(8000, (err) => {
    if(err) {
        console.log(err);
    }
})