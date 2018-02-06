import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.scss';

export default function Header() {
  return (
    <header className="b-header">
      <div className="b-header__right">
        <Link to="/" className="b-header__title">
          blink
        </Link>
        <span className="b-header__description">LEI Finder</span>
      </div>
      <div className="b-header__left">
        <nav className="b-header__nav">
          <Link to="upload" className="b-header__nav-item">
            upload
          </Link>
          <span className="b-header__nav-divider">|</span>
          <Link to="entities" className="b-header__nav-item">
            entities
          </Link>
          <span className="b-header__nav-divider">|</span>
          <Link to="signout" className="b-header__nav-item">
            sign out
          </Link>
          <span className="b-header__nav-divider">|</span>
          <span className="b-header__workspace">
            workspace:{' '}
            <span className="b-header__workspace-id">sado.ogie@gmail.com</span>
          </span>
        </nav>
      </div>
    </header>
  );
}
