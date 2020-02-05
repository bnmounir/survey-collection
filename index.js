const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(data => console.log(' Connected! '))
    .catch(err => console.log('Failed to Connect: ', err));

if (process.env.NODE_ENV === 'production') {
    // express serve production assets
    app.use(express.static('client/build'));
    // express will serve index.html if route not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
