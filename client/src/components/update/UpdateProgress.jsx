import React from 'react';
import { Segment, List } from 'semantic-ui-react';

const UpdateProgress = () => (
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
          <List.Description> Colud not find command xvsf</List.Description>
        </List.Content>
      </List.Item>
    </List>
  </Segment>
);

export default UpdateProgress;
