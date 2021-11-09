import styled, { createGlobalStyle } from 'styled-components';
import media from 'styled-media-query';

export const ReferralInput = styled.input`
  background-color: #33363d;
  border: none;
  margin-top: 5px;
  padding: 10px !important;
  color: #c8c8c8;
  border-radius: 30px;
  text-align: center;

  ${media.greaterThan('small')`
        background-color: #33363D;
        border: none;
        padding: 10px !important;
        color: #C8C8C8;
        border-radius: 30px;
        text-align: center;
        margin-top: 15px;
    `}
`;

/* eslint-disable max-len */
export const Global = createGlobalStyle`
  html {
    font-size:62.5%;
  }
  body{
    background-image: linear-gradient(to left top, #000000, #000000, #222123, #060606, #000000, #2a2b2f, #2f3133, #1f2123, #35393c, #393e40, #2b2d2d, #2a2f2f);
    min-height: 100vh;
    background-repeat: no-repeat;
    padding-bottom: 10rem;
    background-color: #000;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .main-bg{
    background-repeat: no-repeat;
    background-size: cover;
    height: 1550px;

    -moz-background-size: cover;
    background-position: center;
  }
  
  .progress {
    height: 2rem;
    margin-bottom: 2rem;

    .progress-bar {
      background-color: #28a745 !important;
    }
  }

  .progress-text{ color: #eaae05;
    font-size: 16px; padding-bottom: 5px;
  }
  .progress-text2{ color: #ededed;
    font-size: 16px;
  }
  .text-h1{color: #fff;
    font-size: 18px; margin-top:15px;}
  
  .white-text{
    color: #fff;
    font-size: 18px;
  }

  .social1 {
    color:#fff;
    font-size:30px;
    margin: 8px;
  }
  .buy-max{
    background-color: #212429;
    border: 2px solid #9c9c9c;
    box-shadow: #7e7d80 0px 2px 6px;
    border-radius: 23px;
    height: 385px;
    padding-left: 21px;
    padding-top: 25px;
    padding-right: 21px;
    padding-bottom: 5px;
  }
  .claim-max{
    background-color: #212429;
    border: 2px solid #9c9c9c;
    box-shadow: #7e7d80 0px 2px 6px;
    border-radius: 23px;
    height: 385px;
    padding-left: 21px;
    padding-top: 25px;
    padding-right: 21px;
    padding-bottom: 5px;
  }

  .text-warning{
    color: #d3ac2b !important;
  }
  .claim-max-button{
    margin-top: 2px !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .buy-button{
    background-color: #111215 !important;
    color: #cacaca !important;
    font-weight: 600;
    border-radius: 23px !important;
    font-size: 20px;
    margin-top: 30px;
    border: none;
  }
  .btn-primary:hover{
    border: 2px solid #9c9c9c !important;
    box-shadow: none !important;
  }
  .btn-primary:active{
    border: 0px solid #2172E5 !important;
    box-shadow: none !important;
  }

  .btn-primary:focus{
    border: 2px solid #2172E5 !important;
    box-shadow: none !important;
  }

  .modal-body{
    border-radius: 0 !important;
    background-color: #212429 !important;
    box-shadow: none;
    border: none;
  }
  .modal-header{
    border-radius: 0 !important;
    background-color: #212429 !important;
    color: #fff;
  }

  .btn-outline-light:focus{
    border: 1px solid #ffffff !important;
    box-shadow: none !important;
  }


  @media only screen and (max-width: 770px) {
    /*mobile*/
    .airdrop-section{
      padding: 0 !important;
      margin-top: 25px;
    }
    .claim-max{
      height: 50.5rem;
    }
  }
`;

const Root = styled.div``;

export default Root;
