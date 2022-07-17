import React from "react";
import Router from "next/router";

export type ArticleProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  link: string;
  tags: string[];
  read: boolean;
};

const Article: React.FC<{ article: ArticleProps }> = ({ article }) => {
  const authorName = article.author ? article.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${article.id}`)}>
      <h2>{article.title}</h2>
      <ul>{article.tags.map(tag=> <li>{tag}</li>)}</ul>
      <small>Shared By {authorName}</small>
      <p>{article.link} </p>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        ul {
          display: flex;
        }
        ul li {
          list-style-type: none;
          padding: 2px;
          margin: 2px;
          border: 1px solid #aaa;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Article;
