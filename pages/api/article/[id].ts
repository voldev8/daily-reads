import prisma from '../../../lib/prisma';

// DELETE /api/article/:id
export default async function handle(req, res) {
  const articleId = req.query.id;
  if (req.method === 'DELETE') {
    const article = await prisma.article.delete({
      where: { id: articleId },
    });
    res.json(article);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
