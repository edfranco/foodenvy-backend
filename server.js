const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const routes = require('./routes');


app.use(express.json());

app.use(session({
    secret: 'tree fiddy',
    resave: false,
    saveUninitialized: false
}));

const corsOptions = {
    origin: ["https://edfranco.github.io/foodenvy-frontend"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// routes
app.use(`/api/v1/users`, routes.users);
app.use(`/api/v1/posts`, routes.posts);
app.use(`/api/v1/restaurants`, routes.restaurants);
app.use(`/api/v1/auth`, routes.auth);
app.use('/api/v1/maps', routes.maps);
app.use('/uploads', express.static('uploads'));

app.listen(4000, console.log('server is live at port'));
