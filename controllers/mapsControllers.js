require('dotenv').config();
const KEY = process.env.API_KEY;

const show = (req, res) => {
    res.json({ key: KEY })
};

module.exports = {
    show
};