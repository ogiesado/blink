import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader">{message}</div>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
