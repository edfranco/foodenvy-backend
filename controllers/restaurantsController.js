const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

const create = (req, res) => {
    db.Restaurant.create(req.body, (error, createdRestaurant) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: createdRestaurant,
            requestedAt: getTime()
        });
    });
};

const index = (req, res) => {
    db.Restaurant.find({}, (error, allRestaurants) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            number_of_results: allRestaurants.length,
            data: allRestaurants,
            requestedAt: getTime()
        });
    });
};

const show = (req, res) => {
    db.Restaurant.findById(req.params.id, (error, foundRestaurant) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: foundRestaurant,
            requestedAt: getTime()
        });
    });
};

const edit = (req, res) => {
    db.Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, editedUser) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: editedUser,
            requestedAt: getTime()
        });
    });
};

const destroy = (req, res) => {
    db.Restaurant.findByIdAndDelete(req.params.id, (error, deletedRestaurant) => {
        if (error) return res.status(500).json({ status: 500, message: 'Could not delete' });
        res.status(200).json({
            status: 200,
            data: 'Successfully deleted restaurant'
        })
    })
}

module.exports = {
    create,
    index,
    show,
    edit,
    destroy
}
