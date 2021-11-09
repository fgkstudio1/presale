import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import contractConfig from 'config/contract.json';
import web3 from 'web3';
import { format, fromUnixTime } from 'date-fns';
import { InjectedConnector } from '@web3-react/injected-connector';
import useEagerConnect from '../hooks/useEagerConnect';

const ContractContext = React.createContext({});

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    56, // mainnet
    97, // testnet
  ],
});

export const ContractProvider = (props) => {
  const { children } = props;
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [claimed, setClaimed] = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [softCap, setSoftCap] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [minInvest, setMinInvest] = useState(0);
  const [maxInvest, setMaxInvest] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);

  useEagerConnect(injectedConnector);

  const connect = useCallback(async () => {
    try {
      await activate(injectedConnector);
    } catch (ex) {
      console.log(ex);
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }, [deactivate]);

  const contract = useMemo(() => {
    if (library) {
      return new library.eth.Contract(contractConfig.abi, contractConfig.address);
    }

    return null;
  }, [library]);

  const handleContractMethodError = useCallback((error) => {
    console.error('=== CONTRACT METHOD ERROR: ', error);
  }, []);

  const runContractMethods = useCallback(() => {
    if (contract) {
      contract.methods
        .openTime()
        .call()
        .then((data) => {
          setOpenTime(format(fromUnixTime(data), 'MMM d, yyyy HH:mm:ss'));
        })
        .catch(handleContractMethodError);

      contract.methods
        .closeTime()
        .call()
        .then((data) => {
          setCloseTime(format(fromUnixTime(data), 'MMM d, yyyy HH:mm:ss'));
        })
        .catch(handleContractMethodError);

      contract.methods
        .claimed(account)
        .call()
        .then((data) => {
          setClaimed(data);
        })
        .catch(handleContractMethodError);

      contract.methods
        .investments(account)
        .call()
        .then((data) => {
          setInvestments(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .hardCapInWei()
        .call()
        .then((data) => {
          setHardCap(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .softCapInWei()
        .call()
        .then((data) => {
          setSoftCap(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .minInvestInWei()
        .call()
        .then((data) => {
          setMinInvest(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .maxInvestInWei()
        .call()
        .then((data) => {
          setMaxInvest(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .tokenPriceInWei()
        .call()
        .then((data) => {
          setTokenPrice(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .totalTokens()
        .call()
        .then((data) => {
          setTotalTokens(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .tokensLeft()
        .call()
        .then((data) => {
          setTokensLeft(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .totalCollectedWei()
        .call()
        .then((data) => {
          setTotalCollected(web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);
    }
  }, [account, contract, handleContractMethodError]);

  useEffect(() => {
    runContractMethods();
  }, [runContractMethods]);

  const invest = useCallback(
    (value, callback) => {
      console.log({ from: account, value });

      contract.methods
        .invest()
        .send(
          { from: account, value: web3.utils.toWei(value.toString()), gasLimit: 150000 },
          callback
        )
        .catch(handleContractMethodError);
    },
    [account, contract, handleContractMethodError]
  );

  const contextValue = useMemo(() => {
    return {
      values: {
        openTime,
        closeTime,
        claimed,
        hardCap,
        softCap,
        investments,
        minInvest,
        maxInvest,
        tokenPrice,
        totalTokens,
        tokensLeft,
        totalCollected,
      },
      methods: {
        invest,
      },
      connect,
      disconnect,
      active,
    };
  }, [
    openTime,
    closeTime,
    claimed,
    hardCap,
    softCap,
    investments,
    minInvest,
    maxInvest,
    tokenPrice,
    totalTokens,
    tokensLeft,
    totalCollected,
    connect,
    disconnect,
    active,
    invest,
  ]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
};

export const useContractContext = () => useContext(ContractContext);
