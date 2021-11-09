import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from 'components/TextInput';
import arrowDown from 'images/arrow-down.svg';
import ContentBox from 'components/ContentBox';
import { useContractContext } from 'contexts/ContractContext';

const TradeForm = () => {
  const [isInitialValueSet, setIsInitialValueSet] = useState(false);
  const {
    values: { tokenPrice },
    methods: { invest },
    active,
  } = useContractContext();

  const { register, setValue, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      bnbAmount: 0.1,
    },
  });

  const tokenAmount = watch('tokenAmount');
  const bnbAmount = watch('bnbAmount');

  const handleBnbAmountChange = useCallback(
    (e) => {
      setValue('tokenAmount', +e.target.value / +tokenPrice);
    },
    [setValue, tokenPrice]
  );

  const handleTokenAmountChange = useCallback(
    (e) => {
      setValue('bnbAmount', +(+e.target.value * +tokenPrice));
    },
    [setValue, tokenPrice]
  );

  const onSubmit = useCallback(
    ({ bnbAmount }) => {
      invest(bnbAmount, (error, response) => {
        if (error) {
          console.log('=== ERROR: ', error);
        } else {
          console.log('=== RESPONSE: ', response);
        }
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
    return !active || !(tokenAmount > 0) || !(bnbAmount > 0);
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
