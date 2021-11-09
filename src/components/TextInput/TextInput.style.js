import styled from 'styled-components';
import logoIcon from 'images/favico-portoken.png';

export const ErrorMessage = styled.span`
  color: #f00;
`;

export const Input = styled.input`
  background-color: #33363d !important;
  border: none;
  padding: 15px !important;
  color: #c8c8c8;
  font-size: 18px;
  border-radius: 30px !important;
  background: url(${logoIcon}) right no-repeat;
  background-size: 55px;
`;

const Root = styled.div`
  width: 100%;
`;

export default Root;
