import React from 'react';
import Root, { Message, Link } from './ToastContent.style';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastContent = (props) => {
  const { message, link } = props;

  return (
    <Root>
      <Message>
        {message}
        <Link href={link} target="_blank">
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Link>
      </Message>
    </Root>
  );
};

export default ToastContent;
