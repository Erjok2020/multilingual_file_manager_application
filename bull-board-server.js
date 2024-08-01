const express = require('express');
const { BullAdapter } = require('bull-board');
const { setQueues, BullAdapter: BullAdapterBoard } = require('bull-board');
const Queue = require('bull');

// Initialize express app
const app = express();
const port = 3001; // Choose a port for Bull Board UI

// Create a Bull queue
const myQueue = new Queue('myQueue');

// Initialize Bull Board with your queues
setQueues([new BullAdapter(myQueue)]);

// Setup Bull Board route
app.use('/admin/queues', require('bull-board').router);

// Start the server
app.listen(port, () => {
    console.log(`Bull Board is running on http://localhost:${port}/admin/queues`);
});
