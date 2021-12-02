import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import contractConfig from 'config/contract.json';
import Web3 from 'web3';
import { format, fromUnixTime, add } from 'date-fns';
import { injectedConnector } from 'utils/connectors';
import useEagerConnect from 'hooks/useEagerConnect';
import { toast } from 'react-toastify';
import ToastContent from '../components/ToastContent';
const ContractContext = React.createContext({});

export const ContractProvider = (props) => {
  const { children } = props;
  const { active, account, library, activate, deactivate, chainId } = useWeb3React();
  const {
    hardCap,
    softCap,
    minInvest,
    maxInvest,
    tokenPrice,
    claimOffsetInHours,
  } = contractConfig.presaleInformation;
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [claimed, setClaimed] = useState(0);
  const [isClaimed, setIsClaimed] = useState(0);
  const [tokenToClaim, setTokenToClaim] = useState(0);
  const [claimTime, setClaimTime] = useState('');
  const [investments, setInvestments] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalInvestorsCount, setTotalInvestorsCount] = useState(0);
  const canClaim = useMemo(() => {
    if (isClaimed) {
      return false;
    }

    const config = contractConfig.presaleInformation;
    const claimDate = add(fromUnixTime(config.closeTime), { hours: config.claimOffsetInHours });

    return claimDate <= new Date();
  }, [isClaimed]);

  const canBuy = useMemo(() => {
    const config = contractConfig.presaleInformation;
    const openDate = fromUnixTime(config.openTime);

    return openDate <= new Date();
  }, []);

  const httpProvidedContract = useMemo(() => {
    const provider = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));

    return new provider.eth.Contract(contractConfig.abi, contractConfig.presaleAddress);
  }, []);

  useEagerConnect(injectedConnector);

  useEffect(() => {
    if (!account || !library) {
      return;
    }

    library.eth.getBalance(account).then((amount) => {
      setBalance(Web3.utils.fromWei(amount.toString()));
    });
  }, [account, library]);

  // Switch network
  useEffect(() => {
    if (!window.ethereum) {
      toast(<ToastContent message="You have to install MetaMask!" link="https://metamask.io/" />, {
        type: 'warning',
      });
      return;
    }

    window.ethereum?.request({
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
    toast(error.message, { type: 'error', autoClose: false });
  }, []);

  useEffect(() => {
    const config = contractConfig.presaleInformation;

    setOpenTime(format(fromUnixTime(config.openTime), 'MMM d, yyyy HH:mm:ss'));

    setCloseTime(format(fromUnixTime(config.closeTime), 'MMM d, yyyy HH:mm:ss'));
    setClaimTime(
      format(
        add(fromUnixTime(config.closeTime), { hours: claimOffsetInHours }),
        'MMM d, yyyy HH:mm:ss'
      )
    );
  }, [claimOffsetInHours]);

  const runContractMethods = useCallback(() => {
    if (httpProvidedContract) {
      httpProvidedContract.methods
        .totalCollectedWei()
        .call()
        .then((data) => {
          console.log('=== DATA: ', data);
          setTotalCollected(Web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      httpProvidedContract.methods
        .totalInvestorsCount()
        .call()
        .then((data) => {
          setTotalInvestorsCount(data);
        })
        .catch(handleContractMethodError);
    }

    if (contract) {
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
          setTokenToClaim(Web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .investments(account)
        .call()
        .then((data) => {
          setInvestments(Web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .totalTokens()
        .call()
        .then((data) => {
          setTotalTokens(Web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .tokensLeft()
        .call()
        .then((data) => {
          setTokensLeft(Web3.utils.fromWei(data));
        })
        .catch(handleContractMethodError);

      contract.methods
        .claimed(account)
        .call()
        .then((data) => {
          setIsClaimed(data > 0);
        })
        .catch(handleContractMethodError);
    }
  }, [account, contract, handleContractMethodError, httpProvidedContract]);

  useEffect(() => {
    runContractMethods();
  }, [runContractMethods]);

  const invest = useCallback(
    (value, callback) =>
      contract.methods
        .invest()
        .send(
          {
            from: account,
            value: Web3.utils.toWei(value.toString()),
          },
          callback
        )
        .then((response) => {
          runContractMethods();

          return Promise.resolve(response);
        }),
    [account, contract, runContractMethods]
  );

  const claimTokens = useCallback(
    (callback) =>
      contract.methods
        .claimTokens()
        .send({ from: account }, callback)
        .then((response) => {
          runContractMethods();

          return Promise.resolve(response);
        }),
    [account, contract, runContractMethods]
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
        totalTokens,
        tokensLeft,
        totalCollected,
        totalInvestorsCount,
        canClaim,
        canBuy,
        claimTime,
        isClaimed,
        balance,
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
    totalTokens,
    tokensLeft,
    totalCollected,
    connect,
    disconnect,
    active,
    invest,
    claimTokens,
    totalInvestorsCount,
    canClaim,
    canBuy,
    claimTime,
    isClaimed,
    balance,
  ]);

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
};

export const useContractContext = () => useContext(ContractContext);
