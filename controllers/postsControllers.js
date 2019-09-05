const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

const create = (req, res) => {
    db.Post.create(req.body, (error, createdPost) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: createdPost,
            requestedAt: getTime()
        });



        db.User.findByIdAndUpdate(req.body.user_id, { new: true }, (error, foundUser) => {
            if (error) return console.log(error);
            foundUser.posts.push(createdPost);
            foundUser.save();
        })
            .populate('posts')
            .exec((error, user) => {
                if (error) return console.log(error);
                console.log(user);
            });

        db.Restaurant.findOneAndUpdate({ name: req.body.restaurant_name }, { new: true }, (error, foundRestaurant) => {
            if (error) return console.log(error);
            foundRestaurant.posts.push(createdPost);
            foundRestaurant.save();
        })
            .populate('posts')
            .exec((error, restaurant) => {
                if (error) return console.log(error);
                console.log(restaurant);
            });
    });
};

const index = (req, res) => {
    db.Post.find({}, (error, allPosts) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            number_of_results: allPosts.length,
            data: allPosts,
            requestedAt: getTime()
        });
    });
};

const show = (req, res) => {
    db.Post.findById(req.params.id, (error, foundPost) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: foundPost,
            requestedAt: getTime()
        });
    });
};

const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: 'Successfully deleted post',
            requestedAt: getTime()
        });
    });
};

const edit = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedPost) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: updatedPost,
            requestedAt: getTime()
        });
    })
}

module.exports = {
    create,
    index,
    show,
    destroy,
    edit
}