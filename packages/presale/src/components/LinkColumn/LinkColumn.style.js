import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #bfbfbf;
  font-size: 1.5rem;
  margin-top: 1.5rem;

  a {
    font-weight: bold;
    color: #eaae05;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    width: 100%;
  }
`;

export default Root;
