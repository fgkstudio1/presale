import styled from 'styled-components';
import BootstrapButton from 'react-bootstrap/Button';

export const InputError = styled.p`
  color: #f00;
  padding: 5px 10px 0 10px;
  margin: 0;
  font-size: 14px;
`;

export const Button = styled.button`
  border: solid 2px #111215 !important;
`;

export const MaxButton = styled(BootstrapButton)`
  position: absolute !important;
  right: 60px;
  top: 21px;
  color: #fff !important;
  font-weight: 500;
`;
