import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Article, { ArticleProps } from '../components/Article';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { myArticles: [] } };
  }

  const myArticles = await prisma.article.findMany({
    where: {
      NOT: {
        readUsers: {
          some: {
            name: session.user.name
          }
        }
      }
    },
    include: {
      author: {
        select: { 
          name: true,
          id: true 
        },
      },
      readUsers: {
        select: { 
          name: true,
          id: true 
        },
      }
    }
  });

  return {
    props: { myArticles },
  };
};

type Props = {
  myArticles: ArticleProps[];
};

const MyArticles: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Articles</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Articles</h1>
        <main>
          {props.myArticles.map((article) => (
            <div key={article.id} className="article">
              <Article article={article} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .article {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .article:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .article + .article {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default MyArticles;