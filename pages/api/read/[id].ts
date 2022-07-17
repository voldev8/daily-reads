import prisma from '../../../lib/prisma';

// PUT /api/read/:id
export default async function handle(req, res) {
  const articleId = req.query.id;
  const article = await prisma.article.update({
    where: { id: articleId },
    data: { read: true },
  });
  res.json(article);
}
