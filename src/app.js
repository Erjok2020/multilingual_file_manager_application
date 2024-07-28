const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redisClient'); // Assuming you have this file for Redis client setup
const i18n = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Initialize i18n
app.use(i18nextMiddleware.handle(i18n));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Define routes
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
