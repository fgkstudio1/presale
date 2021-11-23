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
import { InputError, Button } from './TradeForm.style';

const TradeForm = () => {
  const [isInitialValueSet, setIsInitialValueSet] = useState(false);
  const [bnbAmountError, setBnbAmountError] = useState(false);
  const {
    values: { tokenPrice, investments, minInvest, maxInvest },
    methods: { invest },
    active,
  } = useContractContext();

  // total token: 10.000.000.000 => $2.000.000
  // presale  token: 2.000.000.000 => $400.000

  const { register, setValue, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      bnbAmount: minInvest,
    },
  });

  const tokenAmount = watch('tokenAmount');
  const bnbAmount = watch('bnbAmount');

  const handleBnbAmountChange = useCallback(
    (e) => {
      const amount = parseFloat(e.target.value) || 0;

      const total = parseFloat(investments) + parseFloat(amount);

      if (total < parseFloat(minInvest)) {
        setBnbAmountError(`You have to invest minimum ${minInvest} BNB`);
      } else if (total > parseFloat(maxInvest)) {
        setBnbAmountError(`You have to invest less than ${maxInvest} BNB`);
      } else {
        setBnbAmountError(false);
      }

      setValue('tokenAmount', amount / tokenPrice);
    },
    [investments, maxInvest, minInvest, setValue, tokenPrice]
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
              link={`${contractConfig.transactionBaseAddress}/${transaction}`}
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
              link={`${contractConfig.transactionBaseAddress}/${transactionHash}`}
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
    return !active || tokenAmount <= 0 || bnbAmount <= 0 || !!bnbAmountError;
  }, [active, bnbAmount, bnbAmountError, tokenAmount]);

  return (
    <ContentBox title="Buy Portoken">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-4">
          <div style={{ width: '100%' }}>
            <TextInput
              {...register('bnbAmount')}
              type="text"
              className="w-100 mt-2"
              placeholder="Enter BNB amount to sell"
              icon={bnbIcon}
              onChange={handleBnbAmountChange}
              disabled={!active}
            />
            {bnbAmountError && <InputError>{bnbAmountError}</InputError>}
          </div>
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
            readOnly
            disabled={!active}
          />
        </div>
        <Button
          type={'submit'}
          disabled={isDisabled}
          className="btn btn-primary buy-button w-100 py-3"
        >
          Buy Portoken
        </Button>
      </form>
    </ContentBox>
  );
};

export default TradeForm;
