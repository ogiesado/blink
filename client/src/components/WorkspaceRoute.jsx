import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hasWorkspaceKey } from '../services/workspace';

const WorkspaceRoute = function({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        hasWorkspaceKey() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

WorkspaceRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default WorkspaceRoute;
