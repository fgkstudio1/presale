import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import contractConfig from '../config/contract.json';
import web3 from 'web3';
import { format, parse, fromUnixTime } from 'date-fns';

const ContractContext = React.createContext({});

export const ContractProvider = (props) => {
  const { children } = props;
  const { account, library } = useWeb3React();

  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [claimed, setClaimed] = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [softCap, setSoftCap] = useState(0);
  const [minInvest, setMinInvest] = useState(0);
  const [maxInvest, setMaxInvest] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);

  const contract = useMemo(() => {
    if (library) {
      return new library.eth.Contract(contractConfig.abi, contractConfig.address);
    }

    return null;
  }, [library]);

  const handleContractMethodError = useCallback((error) => {
    console.error('=== CONTRACT METHOD ERROR: ', error);
  }, []);

  useEffect(() => {
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

  const contextValue = useMemo(() => {
    return {
      openTime,
      closeTime,
      claimed,
      hardCap,
      softCap,
      minInvest,
      maxInvest,
      tokenPrice,
      totalTokens,
      tokensLeft,
      totalCollected,
    };
  }, [
    openTime,
    closeTime,
    claimed,
    hardCap,
    softCap,
    minInvest,
    maxInvest,
    tokenPrice,
    totalTokens,
    tokensLeft,
    totalCollected,
  ]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
};

export const useContractContext = () => useContext(ContractContext);
