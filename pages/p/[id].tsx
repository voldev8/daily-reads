import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { ArticleProps } from "../../components/Article"
import prisma from '../../lib/prisma'
import Router from 'next/router';
import { useSession } from 'next-auth/react';

// This page uses getServerSideProps (SSR) instead of getStaticProps (SSG). 
// This is because the data is dynamic, it depends on the id of the Article that's requested in the URL. 
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const article = await prisma.article.findUnique({
    where: {
      id: String(params?.id)
    },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  })
  return {
    props: article,
  }
}
async function readArticle(id: string): Promise<void> {
  await fetch(`/api/read/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function deleteArticle(id: string): Promise<void> {
  await fetch(`/api/article/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Article: React.FC<ArticleProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating...</div>
  }
  const userHasValidSession = Boolean(session);
  const articleBelongToUser = session?.user?.email === props.author?.email;

  let title = props.title
  if (!props.read) {
    title = `${title}`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <a href={props.link} target="_blank">{props.link}</a>
        <div>
          {!props.read && userHasValidSession && articleBelongToUser && (
            <button onClick={()=>readArticle(props.id)}>Read</button>
          )}
          { userHasValidSession && articleBelongToUser && (
            <button onClick={()=>deleteArticle(props.id)}>Delete</button>
          )}
        </div>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Article
