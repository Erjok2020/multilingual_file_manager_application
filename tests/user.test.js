const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('User Registration and Login', () => {
    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', password: 'password123' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
    });

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ username: 'testuser', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
