const Queue = require('bull');
const redis = require('./redis');

const fileQueue = new Queue('fileQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

fileQueue.process(async (job) => {
    // Process file (e.g., file conversion)
    console.log(`Processing job ${job.id}`);
});

module.exports = fileQueue;
