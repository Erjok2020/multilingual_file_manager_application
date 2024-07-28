const Queue = require('bull');
const redisConfig = {
    host: 'localhost',
    port: 6379
};
const fileQueue = new Queue('fileQueue', { redis: redisConfig });

// Job processor
fileQueue.process(async (job) => {
    // Implement job processing logic, e.g., file processing or conversion
});

module.exports = fileQueue;
