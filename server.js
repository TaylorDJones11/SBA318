import express from 'express';
// import posts from './routes/posts.js';
// import logger from './middleware/logger.js';
// import errorHandler from './middleware/error.js';
// import notFound from './middleware/notFound.js';
const app = express();
const port = process.env.PORT || 8080;
// const fs = require('fs');

// TEMPLATE ENGINE

// app.engine()

app.listen(port, () => console.log(`Server is running on port ${port} number`));
