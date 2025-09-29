const prisma = require('../prismaClient');

async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    const exists = await prisma.category.findUnique({ where: { name } });
    if (exists) return res.status(409).json({ error: 'Category name already exists' });

    const cat = await prisma.category.create({ data: { name } });
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
}

async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    // check uniqueness
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing && existing.id !== id) return res.status(409).json({ error: 'Category name already exists' });

    const cat = await prisma.category.update({ where: { id }, data: { name } });
    res.json(cat);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Category not found' });
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Category not found' });
    next(err);
  }
}

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
