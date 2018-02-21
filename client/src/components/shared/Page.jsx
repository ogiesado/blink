import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => {
  return <div className="b-app-page">{children}</div>;
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
