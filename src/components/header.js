"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [username] = useState("");

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" href="/">conduit</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" className when you're on that page" */}
            <Link className="nav-link active" href="/">Home</Link>
          </li>
          {username ?
            (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/article/new"> <i className="ion-compose"></i>&nbsp;New Article </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href=""> <i className="ion-gear-a"></i>&nbsp;Settings </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="">
                    <img src="" className="user-pic" />
                    {username}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/register">Sign up</Link>
                </li>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  );
}