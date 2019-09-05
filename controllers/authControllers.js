const db = require('../models');
const bcrypt = require('bcryptjs');

function getTime() {
    return new Date().toLocaleString();
};

const register = (req, res) => {
    const errors = [];
    const body = req.body;
    if (!body.username) {
        errors.push({ field: 'username', message: 'please enter a username' });
    };
    if (!body.email) {
        errors.push({ field: 'email', message: 'please enter a email' });
    };
    if (!body.password) {
        errors.push({ field: 'password', message: 'please enter a password' });
    };
    if (!body.password2) {
        errors.push({ field: 'password2', message: 'please confirm a password' });
    };
    if (body.password !== body.password2) {
        errors.push({ field: 'password', message: 'passwords did not match' });
    };
    if (db.User.findOne({ username: body.username }, (error, foundUser) => {
        if (foundUser) errors.push({ field: 'username', message: 'username already taken' });
    }));

    if (errors.length) {
        return res.status(500).json({ status: 500, errors })
    }
    bcrypt.genSalt(10, (error, salt) => {
        if (error) return res.status(500).json({ status: 500, message: 'the error is here' })

        bcrypt.hash(body.password, salt, (error, hash) => {
            if (error) return res.status(500).json({
                status: 500,
                message: 'Something went wrong. Please try again.'
            });
            const newUser = {
                username: body.username,
                email: body.email,
                password: hash
            };
            db.User.create(newUser, (error, createdUser) => {
                if (error) return res.status(500).json({ status: 500, message: 'Could not create user' })
                res.status(200).json({
                    status: 200,
                    data: createdUser
                });
                console.log(createdUser);
            });
        });
    });
};

const login = (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        console.log(body.email, body.password)
        return res.status(500).json({ status: 500, message: 'Please enter an email and/or password' });
    };
    db.User.findOne({ email: body.email }, (error, foundUser) => {
        if (error) return res.status(500).json({ status: 500, message: 'Incorrect email and/or password' });
        bcrypt.compare(body.password, foundUser.password, (error, isMatch) => {
            if (isMatch) {
                req.session.isLoggedIn = true;
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({ status: 200, message: 'Success', id: foundUser._id });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Email or password is incorrect"
                });
            };
        });
    });
};

const logout = (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again.' });
        res.status(200).json({
            status: 200,
            data: 'Successfull logged out'
        });
    });
};

const verify = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized. Please try again.' });
    res.status(200).json({ status: 200, message: 'Current User Verified.' });
}

module.exports = {
    register,
    login,
    logout,
    verify
}

