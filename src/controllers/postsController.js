const prisma = require('../prismaClient');

async function createPost(req, res, next) {
  try {
    const { title, content, userId, categoryId } = req.body;

    // verify user and category exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return res.status(400).json({ error: 'Category not found' });

    const post = await prisma.post.create({
      data: { title, content, userId, categoryId },
      include: { user: { select: { id: true, name: true } }, category: true },
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function listPosts(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
      prisma.post.count(),
      prisma.post.findMany({
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true } }, category: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
      data: posts,
    });
  } catch (err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true } }, category: true },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, content, categoryId } = req.body;

    const data = {};
    if (title) data.title = title;
    if (content) data.content = content;
    if (categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!cat) return res.status(400).json({ error: 'Category not found' });
      data.categoryId = categoryId;
    }

    const post = await prisma.post.update({
      where: { id },
      data,
      include: { user: { select: { id: true, name: true } }, category: true },
    });

    res.json(post);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Post not found' });
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Post not found' });
    next(err);
  }
}

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost,
};
