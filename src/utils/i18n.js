const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

// Mock Database
const users = [];

// Registration Route
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    const newUser = { username, password };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

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
