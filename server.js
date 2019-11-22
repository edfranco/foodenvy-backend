const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 4000;


app.use(express.json());

app.use(session({
    secret: 'tree fiddy',
    resave: false,
    saveUninitialized: false
}));

const corsOptions = {
    origin: 'https://edfranco.github.io',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000'"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// routes
app.use(`/api/v1/users`, routes.users);
app.use(`/api/v1/posts`, routes.posts);
app.use(`/api/v1/restaurants`, routes.restaurants);
app.use(`/api/v1/auth`, routes.auth);
app.use('/api/v1/maps', routes.maps);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, console.log(`server is live at port ${PORT}`));
