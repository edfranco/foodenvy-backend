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
            requestedAt: getTime()
        });
    });
};

const show = (req, res) => {
    db.User.findById(req.params.id)
        .populate({
            path: 'posts',
            model: 'Post',
            populate: {
                path: 'user_id',
                model: 'User'
            }
        })
        .exec((error, foundUser) => {
            if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
            res.status(200).json({
                status: 200,
                data: foundUser,
                requestedAt: getTime()
            })
        })
}

const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
        if (error) return res.status(500).json({ status: 500, message: 'Could not delete user' });
        res.status(200).json({
            status: 200,
            data: 'User successfully deleted',
            requestedAt: getTime()
        });
    });
};

const edit = (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, editedUser) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: editedUser,
            requestedAt: getTime()
        });
    });
};

module.exports = {
    createUser,
    index,
    show,
    destroy,
    edit
}