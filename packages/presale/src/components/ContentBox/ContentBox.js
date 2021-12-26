import React from 'react';
import Root from './ContentBox.style';
import PropTypes from 'prop-types';

const ContentBox = (props) => {
  const { title, children, ...rest } = props;

  return (
    <Root {...rest}>
      <h5 className="text-light title">{title}</h5>
      {children}
    </Root>
  );
};

ContentBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default ContentBox;
