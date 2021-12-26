import styled, { createGlobalStyle } from 'styled-components';

/* eslint-disable max-len */
export const Global = createGlobalStyle`
  html {
    font-size:62.5%;
  }
  body{
    min-height: 100vh;
    background-color: #fff;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Root = styled.div``;

export default Root;
