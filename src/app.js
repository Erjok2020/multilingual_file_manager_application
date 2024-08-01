const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = process.env.PORT || 3000;

// i18next setup
i18next.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
    }
});

app.use(i18nextMiddleware.handle(i18next));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
