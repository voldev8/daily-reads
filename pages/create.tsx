import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {title, link, tags};
      await fetch('/api/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/myarticles');
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Article</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
            type="text"
            value={link}
          />
          <input
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (Please leave only space between tags)"
            type="text"
            value={tags}
          />
          <input disabled={!link || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
