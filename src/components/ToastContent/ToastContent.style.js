import styled from 'styled-components';

export const Message = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const Link = styled.a`
  margin-left: 10px;
  color: #eaae05;

  &:hover {
    color: #eaae05;
  }
`;

const Root = styled.div`
  white-space: nowrap;
`;

export default Root;
