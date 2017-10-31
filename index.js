const express = require('express');
require('./services/passport');
const authRoute = require('./routes/authRoutes');

const app = express();
authRoute(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);