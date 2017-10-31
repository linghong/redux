const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/user');
require('./services/passport');

const authRoute = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI, "authSource=admin");

const app = express();
authRoute(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);