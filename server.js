import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import posts from './routes/posts.js';
// import logger from './middleware/logger.js';
// import errorHandler from './middleware/error.js';
// import notFound from './middleware/notFound.js';
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Read posts from file
const readPostsFromFile = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'posts.json'));
  return JSON.parse(data);
};

let posts = readPostsFromFile();

// TEMPLATE ENGINE

// app.engine()

app.listen(port, () => console.log(`Server is running on port ${port} number`));
