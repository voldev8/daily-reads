import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Article, { ArticleProps } from "../components/Article"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.article.findMany({
    include: {
      author: {
        select: { name: true },
      }
    }
  })
  

  return { 
    props: { 
      feed, 
    }, 
    revalidate: 10 
  }

}

type Props = {
  feed: ArticleProps[],
}

const AllArticles: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>All Articles</h1>
        <main>
          {props.feed.map((article) => (
            <div key={article.id} className="article">
              <Article article={article} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .article {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .article:hover {
          box-shadow: 1px 1px 3px #aaa;
          cursor: pointer;
        }

        .article + .article {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default AllArticles
