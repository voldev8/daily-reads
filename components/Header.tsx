import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="logo" data-active={isActive("/")}>
          Daily Reads
        </a>
      </Link>
      <style jsx>{`
        .logo {
          text-decoration: none;
          font-size: 2rem;
          font-weight: bold;
          color: #f7cfc8;
          text-shadow: -1px 1px 0px #4d84c8,
                       -2px 2px 0px #4d84c8,
                       -3px 3px 0px #4d84c8,
                       -4px 4px 0px #4d84c8,
                       -5px 5px 0px #4d84c8,
                       -6px 6px 0px #4d84c8;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    right = (
      <div className="right">
        <img className="user-image" src={session.user.image} alt="user image" />
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New article</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }
          .user-image {
            border-radius: 50%;
            height: 2rem;
            display: flex;
            align-self: center;
            margin-right: 4px;
            border: 1px solid #4d84c8;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
            display: flex;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }


  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
          box-shadow: 2px 2px 4px rgba(0,0,0,0.2)
        }
      `}</style>
    </nav>
  );
};

export default Header;
