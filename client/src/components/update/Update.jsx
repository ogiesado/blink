import React, { Component } from 'react';
import { Table, Icon, Button, Segment, List } from 'semantic-ui-react';
import Page from '../shared/Page.jsx';
import PageHeader from '../shared/PageHeader.jsx';
import './Update.scss';

export default class Update extends Component {
  render() {
    return (
      <Page>
        <PageHeader
          title="Update"
          icon="refresh"
          description="GLEIF data Synchronization."
        />
        <Table stackable size="small">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="b-update__status-label">
                Last Update
              </Table.Cell>
              <Table.Cell className="b-primary" textAlign="right">
                10-02-2018 10:05 AM
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="b-update__status-label">
                Total Records
              </Table.Cell>
              <Table.Cell className="b-primary" textAlign="right">
                1,079,232
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="b-update__status-label">
                Last Update By
              </Table.Cell>
              <Table.Cell className="b-primary" textAlign="right">
                system
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button primary icon labelPosition="right" disabled>
          Updating...
          <Icon name="upload" />
        </Button>
        <Segment secondary>
          <List relaxed>
            <List.Item>
              <List.Content>
                <List.Header as="a">Check GLEIF for update</List.Header>
                <List.Description>10-02-2018 10:32 AM</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Download GLEIF file</List.Header>
                <List.Description>10-02-2018 11:12 AM</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Extract GLEIF file</List.Header>
                <List.Description>Extraction at 20%...</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Update completed</List.Header>
                <List.Description>10-02-2018 11:12 AM</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Update failed</List.Header>
                <List.Description>
                  {' '}
                  Colud not find command xvsf
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Page>
    );
  }
}
