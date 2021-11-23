import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContractContext } from 'contexts/ContractContext';
import TextInput from 'components/TextInput';
import ContentBox from 'components/ContentBox';
import ToastContent from 'components/ToastContent';
import contractConfig from 'config/contract.json';
import arrowDown from 'images/arrow-down.svg';
import bnbIcon from 'images/bnb2.svg';

const TradeForm = () => {
  const [isInitialValueSet, setIsInitialValueSet] = useState(false);
  const {
    values: { tokenPrice },
    methods: { invest },
    active,
  } = useContractContext();

  // total token: 10.000.000.000 => $2.000.000
  // presale  token: 2.000.000.000 => $400.000

  const { register, setValue, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      bnbAmount: 0.1,
    },
  });

  const tokenAmount = watch('tokenAmount');
  const bnbAmount = watch('bnbAmount');

  const handleBnbAmountChange = useCallback(
    (e) => {
      setValue('tokenAmount', parseFloat(e.target.value) / tokenPrice);
    },
    [setValue, tokenPrice]
  );

  const handleTokenAmountChange = useCallback(
    (e) => {
      setValue('bnbAmount', parseFloat(e.target.value) * tokenPrice);
    },
    [setValue, tokenPrice]
  );

  const onSubmit = useCallback(
    ({ bnbAmount }) => {
      let toastId = null;

      invest(bnbAmount, (error, transaction) => {
        if (error) {
          toast(error?.message || error, { type: 'error', autoClose: 10000 });
        } else {
          toastId = toast(
            <ToastContent
              message="Transaction is in progress"
              link={`${contractConfig.transactionCheckAddress}/${transaction}`}
              isLoading
            />,
            {
              type: 'success',
              autoClose: false,
            }
          );
        }
      })
        .then(({ transactionHash }) => {
          toast.dismiss(toastId);

          toast(
            <ToastContent
              message="Transaction successful"
              link={`${contractConfig.transactionCheckAddress}/${transactionHash}`}
            />,
            { type: 'success', autoClose: false }
          );
        })
        .catch((error) => {
          toast.dismiss(toastId);

          toast(error.message, { type: 'error', autoClose: false });
        });
    },
    [invest]
  );

  // Set initial token amount
  useEffect(() => {
    if (active && !isInitialValueSet && tokenPrice > 0) {
      const { bnbAmount } = getValues();
      setValue('tokenAmount', +bnbAmount / +tokenPrice);
      setIsInitialValueSet(true);
    }
  }, [active, getValues, isInitialValueSet, setValue, tokenPrice]);

  const isDisabled = useMemo(() => {
    return !active || tokenAmount <= 0 || bnbAmount <= 0;
  }, [active, bnbAmount, tokenAmount]);

  return (
    <ContentBox title="Buy Portoken">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-4">
          <TextInput
            {...register('bnbAmount')}
            type="text"
            className="w-100 mt-2"
            placeholder="Enter BNB amount to sell"
            icon={bnbIcon}
            onChange={handleBnbAmountChange}
            disabled={!active}
          />
          <img
            src={arrowDown}
            className="mx-auto justify-content-center mt-3"
            width="35px"
            alt=""
          />
          <TextInput
            {...register('tokenAmount')}
            type="text"
            className="w-100 mt-3"
            onChange={handleTokenAmountChange}
            disabled={!active}
          />
        </div>
        <button
          type={'submit'}
          disabled={isDisabled}
          className="btn btn-primary buy-button w-100 py-3"
        >
          Buy Portoken
        </button>
      </form>
    </ContentBox>
  );
};

export default TradeForm;
