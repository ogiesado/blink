import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import UpdateProgress from './UpdateProgress.jsx';
import { checkUpdateStatus, startUpdate } from '../../services/updates';

export default class Updater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      text: 'Update',
      isUpdating: false,
      logs: [],
      hasError: false,
      message: '',
    };

    this.interval = null;
  }

  handleUpdateStatus = ({ isUpdating, hasError, message, logs }) => {
    const disabled = isUpdating;
    const text = isUpdating ? 'Upadating...' : 'Update';
    this.setState({ disabled, text, isUpdating, hasError, message, logs });

    if (isUpdating && this.interval === null) {
      this.interval = setInterval(this.checkUpdateStatus, 2000);
    }

    if (!isUpdating && this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  handleUpdateStatusError = error => {
    throw error;
  };

  checkUpdateStatus = () =>
    checkUpdateStatus()
      .then(this.handleUpdateStatus)
      .catch(this.handleUpdateStatusError);

  startUpdate = () => {
    const { disabled, isUpdating } = this.state;
    if (disabled || isUpdating) {
      return;
    }

    this.setState({ disabled: true, text: 'Starting...' });

    startUpdate()
      .then(this.handleUpdateStatus)
      .catch(this.handleUpdateStatusError);
  };

  componentDidMount() {
    this.setState({ text: 'Checking...' });
    this.checkUpdateStatus();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { disabled, text } = this.state;

    return (
      <div>
        <Button
          primary
          icon
          labelPosition="right"
          disabled={disabled}
          onClick={this.startUpdate}
        >
          {text}
          <Icon
            name={disabled ? 'refresh' : 'upload'}
            className={disabled ? 'loading' : ''}
          />
        </Button>
        <UpdateProgress />
      </div>
    );
  }
}
