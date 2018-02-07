import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Upload from './Upload.jsx';
import Entities from './Entities.jsx';
import NotFound from './NotFound.jsx';
import Footer from './Footer.jsx';
import WorkspaceRoute from './WorkspaceRoute.jsx';
import Loading from './Loading.jsx';
import Login from './Login.jsx';
import {
  hasWorkspaceKey,
  getWorkSpaceKey,
  // verifyWorkSpaceKey,
} from '../services/workspace';
import './styles/Blink.scss';

export default class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaceId: null,
      workspaceVerified: false,
      showLoading: true,
      message: 'Checking workspace...',
      loginRequired: !hasWorkspaceKey(),
    };
  }

  static propTypes = {
    location: PropTypes.object,
  };

  setMessage = message => {
    this.setState({ message });
  };

  componentDidMount() {
    hasWorkspaceKey();
    getWorkSpaceKey();
    // verifyWorkSpaceKey();
    // this.checkWorkspace().then(verifyWorkSpaceKey);
  }

  render() {
    const {
      workspaceVerified,
      showLoading,
      message,
      loginRequired,
    } = this.state;
    return (
      <Router>
        <div className="b-app">
          <Header showNavigation={workspaceVerified} />
          <div className="b-app__main ui piled segment">
            {loginRequired ? (
              <Login />
            ) : showLoading ? (
              <Loading className="b-app__loading" message={message} />
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/upload" component={Upload} />
                <WorkspaceRoute path="/entities" component={Entities} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
