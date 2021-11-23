import styled, { css } from 'styled-components';
import loader from 'images/tail-spin.svg';

export const Message = styled.p`
  font-size: 15px;
  margin: 0;
  display: inline-block;

  ${({ isLoading }) =>
    isLoading &&
    css`
      background: url(${loader}) no-repeat right center;
      background-size: 18px auto;
      padding-right: 30px;
    `}
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
