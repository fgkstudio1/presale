import React from 'react';
import Root, { Input, ErrorMessage } from './TextInput.style';

const TextInput = React.forwardRef((props, ref) => {
  const { error, icon } = props;

  return (
    <Root>
      <Input ref={ref} icon={icon} {...props} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Root>
  );
});

export default TextInput;
