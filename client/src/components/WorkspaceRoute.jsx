import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hasWorkspaceKey } from '../services/workspace';

const reload = () => {
  window.location.reload(true);

  return null;
};

const WorkspaceRoute = function({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        hasWorkspaceKey() ? <Component {...props} /> : reload()
      }
    />
  );
};

WorkspaceRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default WorkspaceRoute;
