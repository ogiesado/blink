import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
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
  verifyWorkspaceKey,
  removeWorkspaceKey,
  hasWorkspaceKey,
  getWorkspaceKey,
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

  onWorkspaceSet = ({ id }) => {
    this.setState({
      workspaceVerified: true,
      workspaceId: id,
      loginRequired: false,
      showLoading: false,
    });
  };

  componentDidMount() {
    const { loginRequired, workspaceVerified } = this.state;

    if (!loginRequired && !workspaceVerified) {
      verifyWorkspaceKey(getWorkspaceKey())
        .then(this.onWorkspaceSet)
        .catch(error => {
          removeWorkspaceKey();
          window.location.reload(true);
          throw error;
        });
    }
  }

  render() {
    const {
      workspaceVerified,
      showLoading,
      message,
      loginRequired,
      workspaceId,
    } = this.state;
    return (
      <Router>
        <div className="b-app">
          <Header
            showNavigation={workspaceVerified}
            workspaceId={workspaceId}
          />
          <Segment className="b-app__main" piled>
            {loginRequired ? (
              <Login workspaceSet={this.onWorkspaceSet} />
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
          </Segment>
          <Footer />
        </div>
      </Router>
    );
  }
}
