import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readPosts, writePosts } from './controllers/postController.js';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 8080;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/// Logger middleware
app.use(logger);

////////setup static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Routes
app.use('/api/posts', posts);

// Home route - EJS
app.get('/', (req, res) => {
  const posts = readPosts();
  res.render('home', { posts });
});

// Route to view a single post - EJS
app.get('/post/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// Route to render the form for creating a new post - EJS
app.get('/new-post', (req, res) => {
  res.render('new-post');
});

// Route to handle the creation of a new post - EJS
app.post('/new-post', (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  writePosts(posts);
  res.redirect('/');
});

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port} now`));
