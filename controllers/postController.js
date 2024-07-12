import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');

// Read posts from file
export const readPosts = () => {
  const data = fs.readFileSync(postsFilePath);
  return JSON.parse(data);
};

// Write posts to file
export const writePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

let posts = readPosts();

// @desc  Get all posts
// @route  GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc  Get single posts
// @route  GET /api/posts/:id

export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the ide of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  return res.status(200).json(post);
};

// @desc  Create a post
// @route  POST /api/posts
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  writePosts(posts);
  res.status(201).json(posts);
};

// @desc  update a post
// @route  UPDATE /api/posts

export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  writePosts(posts);
  res.status(200).json(posts);
};

// @desc  delete a post
// @route  DELETE /api/posts

export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post not found`);
    error.status = 400;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  writePosts(posts);
  res.status(200).json(posts);
};
