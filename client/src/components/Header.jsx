import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles/Header.scss';

const Header = function({ showNavigation, workspaceId }) {
  return (
    <header className="b-header">
      <div className="b-header__right">
        <Link to="/" className="b-header__title">
          blink
        </Link>
        <span className="b-header__description">LEI Finder</span>
      </div>
      <div className="b-header__left">
        {showNavigation && (
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
              <span className="b-header__workspace-id">{workspaceId}</span>
            </span>
          </nav>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  workspaceId: PropTypes.string,
  showNavigation: PropTypes.bool.isRequired,
};

export default Header;
