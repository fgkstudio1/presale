import React from 'react';
import Root from './LinkColumn.style';
import PropTypes from 'prop-types';

const LinkColumn = (props) => {
  const { name, linkLabel, link, ...rest } = props;

  return (
    <Root {...rest}>
      <span>{name}</span>
      <a href={link} target="_blank" rel="noreferrer">
        {linkLabel}
      </a>
    </Root>
  );
};

LinkColumn.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkLabel: PropTypes.string,
};

export default LinkColumn;
