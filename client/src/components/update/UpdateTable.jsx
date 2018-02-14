import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const UpdateTable = ({ lastUpdate, lastUpdateBy, totalRecords }) => (
  <Table stackable size="small">
    <Table.Body>
      <Table.Row>
        <Table.Cell className="b-update__status-label">Last Update</Table.Cell>
        <Table.Cell className="b-primary" textAlign="right">
          {lastUpdate}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="b-update__status-label">
          Total Records
        </Table.Cell>
        <Table.Cell className="b-primary" textAlign="right">
          {totalRecords}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="b-update__status-label">
          Last Update By
        </Table.Cell>
        <Table.Cell className="b-primary" textAlign="right">
          {lastUpdateBy}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

UpdateTable.propTypes = {
  lastUpdate: PropTypes.string,
  lastUpdateBy: PropTypes.string,
  totalRecords: PropTypes.number,
};

export default UpdateTable;
