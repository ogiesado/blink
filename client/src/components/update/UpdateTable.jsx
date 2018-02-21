import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const UpdateTable = ({ lastUpdate, lastUpdateBy, totalRecords }) => (
  <Table stackable size="small">
    <Table.Body>
      <Table.Row>
        <Table.Cell className="b-update__status-label">Last Update</Table.Cell>
        <Table.Cell className="b-primary" textAlign="right">
          {format(lastUpdate, 'hh:mm a - ddd MMM Mo, YYYY')}
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
          {lastUpdateBy.toLocaleString()}
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
