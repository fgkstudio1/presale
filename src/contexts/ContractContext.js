import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import contractConfig from 'config/contract.json';
import web3 from 'web3';
import { format, fromUnixTime, add } from 'date-fns';
import { InjectedConnector } from '@web3-react/injected-connector';
import useEagerConnect from 'hooks/useEagerConnect';

const ContractContext = React.createContext({});

const injectedConnector = new InjectedConnector({
  supportedChainIds: contractConfig.supportedChainIds,
});

export const ContractProvider = (props) => {
  const { children } = props;
  const { active, account, library, activate, deactivate, chainId } = useWeb3React();
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [claimed, setClaimed] = useState(0);
  const [isClaimed, setIsClaimed] = useState(0);
  const [tokenToClaim, setTokenToClaim] = useState(0);
  const [claimTime, setClaimTime] = useState('');
  const [hardCap, setHardCap] = useState(0);
  const [softCap, setSoftCap] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [minInvest, setMinInvest] = useState(0);
  const [maxInvest, setMaxInvest] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenPriceInWei, setTokenPriceInWei] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);
  const [totalInvestorsCount, setTotalInvestorsCount] = useState(0);
  const status = useMemo(() => {
    return 'active';
  }, []);

  useEagerConnect(injectedConnector);

  // Switch network
  useEffect(() => {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: contractConfig.switchNetworkChainIdHex,
        },
      ],
    });
  }, [chainId]);

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
      return new library.eth.Contract(contractConfig.abi, contractConfig.presaleAddress);
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
          const date = fromUnixTime(data);

          setCloseTime(format(date, 'MMM d, yyyy HH:mm:ss'));
          setClaimTime(format(add(date, { hours: 1 }), 'MMM d, yyyy HH:mm:ss'));
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
        .tokenToClaim(account)
        .call()
        .then((data) => {
          setTokenToClaim(web3.utils.fromWei(data));
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
          setTokenPriceInWei(data);
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

      contract.methods
        .totalInvestorsCount()
        .call()
        .then((data) => {
          setTotalInvestorsCount(data);
        })
        .catch(handleContractMethodError);

      contract.methods
        .claimed(account)
        .call()
        .then((data) => {
          setIsClaimed(data);
        })
        .catch(handleContractMethodError);
    }
  }, [account, contract, handleContractMethodError]);

  useEffect(() => {
    runContractMethods();
  }, [runContractMethods]);

  const invest = useCallback(
    (value, callback) => {
      contract.methods
        .invest()
        .send(
          {
            from: account,
            value: web3.utils.toWei(value.toString()),
          },
          callback
        )
        .catch(handleContractMethodError);
    },
    [account, contract, handleContractMethodError]
  );

  const claimTokens = useCallback(
    (callback) => {
      contract.methods
        .claimTokens()
        .send({ from: account }, callback)
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
        tokenToClaim,
        hardCap,
        softCap,
        investments,
        minInvest,
        maxInvest,
        tokenPrice,
        tokenPriceInWei,
        totalTokens,
        tokensLeft,
        totalCollected,
        totalInvestorsCount,
        status,
        claimTime,
        isClaimed,
      },
      methods: {
        invest,
        claimTokens,
      },
      connect,
      disconnect,
      active,
    };
  }, [
    openTime,
    closeTime,
    claimed,
    tokenToClaim,
    hardCap,
    softCap,
    investments,
    minInvest,
    maxInvest,
    tokenPrice,
    tokenPriceInWei,
    totalTokens,
    tokensLeft,
    totalCollected,
    connect,
    disconnect,
    active,
    invest,
    claimTokens,
    totalInvestorsCount,
    status,
    claimTime,
    isClaimed,
  ]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
};

export const useContractContext = () => useContext(ContractContext);
