import React from 'react';
import Root, { Input, ErrorMessage } from './TextInput.style';

const TextInput = React.forwardRef((props, ref) => {
  const { error } = props;

  return (
    <Root>
      <Input ref={ref} {...props} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Root>
  );
});

export default TextInput;
