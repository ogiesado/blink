import React, { Component } from 'react';
import { isValidWorkspaceId } from '../../../shared/utils';
import { hasWorkspaceKey } from '../services/workspace';
import './styles/Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.el = null;

    this.state = {
      disabled: false,
      workspaceId: '',
      validWorkspaceId: false,
    };
  }

  login = e => {
    e.preventDefault();

    const { disabled, workspaceId } = this.state;

    if (disabled || !isValidWorkspaceId(workspaceId)) {
      return;
    }

    if (hasWorkspaceKey()) {
      return window.location.reload(true);
    }

    this.setState({ disabled: true });

    setTimeout(() => this.setState({ disabled: false }), 3000);

    console.log('login', workspaceId);
  };

  handleChange = e => {
    const workspaceId = e.target.value;
    const validWorkspaceId = isValidWorkspaceId(workspaceId);
    this.setState({ workspaceId, validWorkspaceId });
  };

  componentDidMount() {
    this.el
      .modal({
        closable: false,
        onApprove: () => this.login(),
      })
      .modal('show');
  }

  render() {
    const { validWorkspaceId, workspaceId, disabled } = this.state;
    return (
      <div
        className="ui basic modal"
        ref={el => {
          this.el = window.$(el);
        }}
      >
        <div className="ui icon header">
          Please set a Workspace ID to continue
        </div>
        <div className="content b-login__content">
          <form onSubmit={this.login}>
            <div className="ui fluid input">
              <input
                disabled={disabled}
                type="text"
                value={workspaceId}
                onChange={this.handleChange}
                placeholder="Enter Workspace ID"
              />
            </div>
          </form>
          <span>
            Your Workspace ID will be used to track your work. You can use your
            email as your Workspace ID since it will be easier to remember.
          </span>
        </div>
        <div className="actions" style={{ textAlign: 'center' }}>
          {validWorkspaceId && (
            <button
              disabled={disabled}
              className="ui primary xinverted button"
              onClick={this.login}
            >
              SET AND CONTINUE <i className="right arrow icon" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
