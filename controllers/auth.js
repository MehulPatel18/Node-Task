const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = (req, res) => {

    const { password, email } = req.body;
    User.findOne({ email })
    .then((user) => {
        // if user already exits than it return error
        if(user) {
            return res.status(500).json({
                status: 'Error',
                message: "Email already exits!"
            });
        }

        // if user is new to system than register
        bcrypt.hash(password,12)
        .then(hashedPasswords => {
            req.body.password = hashedPasswords;
            const user = new User(req.body)
            return user.save();    
        })
        .then(user =>{
            return res.status(200).json({
                status: 'Success',
                message: "User register successfully.",
                data : user
            });
        })
        .catch( err => {
            return res.status(500).json({
                status: 'Error',
                message: "Something went wrong.",
                error : err
            });
        });
        
    });
}

module.exports.signin = (req, res) => {
    
    const { email, password } = req.body;
    let authuser;
    User.findOne({ email })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                status: 'error',
                message: "A user with this email is could not be found."
            });    
        }
        authuser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(user => {
        if (!user) {
            return res.status(500).json({
                status: 'Error',
                message: "Email or password is invalid!",
            });
        }

        const token = jwt.sign({
            email : authuser.email,
            id : authuser._id
        }, "TEST_JWT_SECRET_TOKEN", { expiresIn : '24h'});

        return res.status(200).json({
            status: 'success',
            data :{
                isVerified : true,
                token: token,
                userId : authuser._id.toString()
            }
        });
    })
    .catch( err => {
        return res.status(500).json({
            status: 'Error',
            message: "Something went wrong.",
            error : err
        });
    });
}

module.exports.getuser = (req, res) => {
    console.log("called");
    User.find({})
    .then((users) => {
        if(!users.length) {
            return res.status(401).json({
                status: 'Oops',
                message: "Users not found!",
                users : []
            }); 
        }
        return res.send({
            status: 'Success',
            message: "user",
            users : users
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'Error',
            message: "Something went wrong.",
            error : err
        });
    }) 
}