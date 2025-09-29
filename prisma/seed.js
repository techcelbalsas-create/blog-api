const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@blog.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@blog.com', password: hashed },
  });

  const cat1 = await prisma.category.upsert({
    where: { name: 'General' },
    update: {},
    create: { name: 'General' },
  });

  const cat2 = await prisma.category.upsert({
    where: { name: 'Tech' },
    update: {},
    create: { name: 'Tech' },
  });

  await prisma.post.createMany({
    data: [
      {
        title: 'Bem vindo ao blog',
        content: 'Primeira postagem do blog...',
        userId: user.id,
        categoryId: cat1.id
      },
      {
        title: 'Post sobre tecnologia',
        content: 'Conteúdo sobre tecnologia...',
        userId: user.id,
        categoryId: cat2.id
      }
    ],
    skipDuplicates: true
  });

  console.log('Seed finalizado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
