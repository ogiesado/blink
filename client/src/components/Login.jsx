import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isValidWorkspaceId } from '../../../shared/utils';
import { hasWorkspaceKey, setWorkspaceId } from '../services/workspace';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react';
import './styles/Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      disabled: false,
      workspaceId: '',
      validWorkspaceId: false,
    };
  }

  static propTypes = {
    workspaceSet: PropTypes.func.isRequired,
  };

  login = e => {
    const { disabled, workspaceId } = this.state;

    e.preventDefault();

    if (disabled || !isValidWorkspaceId(workspaceId)) {
      return;
    }

    if (hasWorkspaceKey()) {
      return window.location.reload(true);
    }

    this.setState({ disabled: true });

    setWorkspaceId(workspaceId)
      .then(({ id, key }) => {
        this.props.workspaceSet({ id, key });
      })
      .catch(error => {
        this.setState({ disabled: false });
        throw error;
      });
  };

  handleChange = e => {
    const workspaceId = e.target.value;
    const validWorkspaceId = isValidWorkspaceId(workspaceId);
    this.setState({ workspaceId, validWorkspaceId });
  };

  render() {
    const { validWorkspaceId, workspaceId, disabled, open } = this.state;
    return (
      <Modal basic open={open} closeOnDimmerClick={false} closeOnEscape={false}>
        <Header
          className="b-login__header"
          content="Please set a Workspace ID to continue"
        />
        <Modal.Content className="b-login__content">
          <form onSubmit={this.login}>
            <Input
              fluid
              placeholder="Enter Workspace ID"
              onChange={this.handleChange}
              focus={true}
              disabled={disabled}
              loading={disabled}
              type="text"
              value={workspaceId}
            />
          </form>
          <span>
            Your Workspace ID will be used to track your work. You can use your
            email as your Workspace ID since it will be easier to remember.
          </span>
        </Modal.Content>
        <Modal.Actions className="b-login__actions">
          {validWorkspaceId && (
            <Button primary disabled={disabled} onClick={this.login}>
              SET AND CONTINUE <Icon name="right arrow" />
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}
