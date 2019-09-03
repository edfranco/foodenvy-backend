const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

const createUser = (req, res) => {
    db.User.create(req.body, (error, createdUser) => {
        if (error) return res.status(400).json(
            {
                status: 400,
                message: 'Something went wrong please try again'
            });
        res.status(200).json({
            status: 200,
            data: createdUser,
            requestedAt: getTime()
        });
        console.log(createdUser);
    })
};

const index = (req, res) => {
    db.User.find({}, { password: 0, _v: 0 }, (error, allUsers) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            number_of_results: allUsers.length,
            data: allUsers,
            requestAt: getTime()
        });
    });
};

module.exports = {
    createUser,
    index
}