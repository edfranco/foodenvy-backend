const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

const create = (req, res) => {
    db.Post.create(req.body, (error, createdUser) => {
        if (error) return res.status(500).json({ status: 500, message: 'Something went wrong' });
        res.status(200).json({
            status: 200,
            data: createdUser,
            requestedAt: getTime()
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