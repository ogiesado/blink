import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/NotFound.scss';

const NotFound = ({ history }) => {
  return (
    <div className="b-not-found">
      <h2 className="ui icon header">
        <i className="settings icon" />
        <div className="content">
          Oops! Not Found.
          <div className="sub header">
            The requested page is no longer available or might have been
            removed.
          </div>
        </div>
      </h2>

      <div className="b-not-found__actions">
        <Link to="/" className="ui animated button">
          <div className="visible content">Home</div>
          <div className="hidden content">
            <i className="home icon" />
          </div>
        </Link>

        <div className="ui animated button" onClick={() => history.goBack()}>
          <div className="visible content">Back</div>
          <div className="hidden content">
            <i className="left arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  history: PropTypes.object,
};

export default NotFound;
