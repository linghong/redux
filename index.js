const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport =require('passport');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//cookie session
app.use(cookieSession({
	maxAge:1*24*60*60*1000,
	keys: [keys.cookieKey]
}));

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);