import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Root, { Message, Link } from './ToastContent.style';

const ToastContent = (props) => {
  const { message, link, isLoading } = props;

  return (
    <Root>
      <Message isLoading={isLoading}>
        {message}
        <Link href={link} target="_blank">
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Link>
      </Message>
    </Root>
  );
};

export default ToastContent;
