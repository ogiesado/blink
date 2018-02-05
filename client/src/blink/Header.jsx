import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="b-header">
      <div className="b-header__right">
        <Link to="/" className="b-header__title">
          blink
        </Link>
        <span className="b-header__description">The LEI Linker</span>
      </div>
      <div className="b-header__left">
        <nav className="b-header__nav">
          <Link to="entities">entities</Link>
          <Link to="upload">uploads</Link>
        </nav>
      </div>
    </header>
  );
}
