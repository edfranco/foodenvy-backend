const express = require('express');
const app = express();


// routes
app.use(`/api/v1/users`, routes.users);
app.use(`/api/v1/posts`, routes.posts);
app.use(`/api/v1/restaurants`, routes.restaurants);

app.listen(4000, console.log('server is live at port'));
