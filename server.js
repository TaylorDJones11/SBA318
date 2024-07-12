import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
// import logger from './middleware/logger.js';
// import errorHandler from './middleware/error.js';
// import notFound from './middleware/notFound.js';
const app = express();
const port = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', posts);

// TEMPLATE ENGINE

// app.engine()

app.listen(port, () => console.log(`Server is running on port ${port} number`));
