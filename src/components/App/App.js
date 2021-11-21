import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root, {
  Global,
  // ReferralInput,
} from './App.style';

import { ContractProvider } from 'contexts/ContractContext';
import HomePage from 'pages/HomePage';

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractProvider>
        <Root>
          <Global />

          <HomePage />
        </Root>
      </ContractProvider>
      <ToastContainer />
    </Web3ReactProvider>
  );
}

export default App;
