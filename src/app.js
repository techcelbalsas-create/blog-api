const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const postsRoutes = require('./routes/posts');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/posts', postsRoutes);

// health
app.get('/', (req, res) => res.json({ ok: true }));

// error handler
app.use(errorHandler);

module.exports = app;
