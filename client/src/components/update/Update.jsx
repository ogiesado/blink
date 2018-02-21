import React, { Component } from 'react';
import Page from '../shared/Page.jsx';
import PageHeader from '../shared/PageHeader.jsx';
import Updater from './Updater.jsx';
import Loading from '../Loading.jsx';
import UpdateTable from './UpdateTable.jsx';
import { getUpdateDetails } from '../../services/updates';
import './Update.scss';

export default class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      updateDetails: null,
    };
  }

  showLoading = () => this.setState({ loading: true });

  hideLoading = () => this.setState({ loading: false });

  updateDone = () => this.load();

  load = () => {
    getUpdateDetails()
      .then(updateDetails => {
        this.setState({ updateDetails, loading: false, error: null });
      })
      .catch(error => this.setState({ error: error.message, loading: false }));
  };

  componentDidMount() {
    this.load();
  }

  render() {
    const { loading, error, updateDetails } = this.state;
    return (
      <Page>
        {!loading && (
          <PageHeader
            title="Update"
            icon="refresh"
            description="GLEIF data Synchronization."
          />
        )}
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <UpdateTable {...updateDetails} />
            <Updater updateDone={this.updateDone} />
          </div>
        )}
      </Page>
    );
  }
}
