import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

const PageHeader = ({ icon, title, description }) => {
  return (
    <Header as="h2">
      {icon !== '' ? <Icon name={icon} /> : ''}
      <Header.Content>
        {title}
        <Header.Subheader>{description}</Header.Subheader>
      </Header.Content>
    </Header>
  );
};

PageHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

PageHeader.defaultProps = {
  title: '',
  icon: '',
  description: '',
};

export default PageHeader;
