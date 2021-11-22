import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useContractContext } from 'contexts/ContractContext';
import TextInput from 'components/TextInput';
import ContentBox from 'components/ContentBox';
import ToastContent from 'components/ToastContent';
import contractConfig from 'config/contract.json';

const ClaimForm = () => {
  const {
    values: { tokenToClaim, claimTime, isClaimed },
    methods: { claimTokens },
  } = useContractContext();

  const handleClimButtonClick = useCallback(() => {
    if (claimTokens) {
      claimTokens((error, transaction) => {
        if (error) {
          toast(error?.message || error, { type: 'error', autoClose: 10000 });
        } else {
          toast(
            <ToastContent
              message="Transaction is in progress"
              link={`${contractConfig.transactionCheckAddress}/${transaction}`}
            />,
            {
              type: 'success',
              autoClose: false,
            }
          );
        }
      });
    }
  }, [claimTokens]);

  return (
    <ContentBox title="Claim POR Token">
      <div className="input-group mt-4">
        <TextInput
          type="text"
          className="dark-input w-100 mt-2"
          readOnly
          value={isClaimed ? 0 : tokenToClaim}
        />
      </div>
      <p className="text-muted mt-3">
        You Can Claim your Tokens After: <b id="claimTokenDate">{claimTime}</b>
      </p>
      <button
        disabled={isClaimed}
        className="btn btn-primary buy-button claim-max-button w-100 py-3"
        onClick={handleClimButtonClick}
      >
        {isClaimed ? 'Already Claimed' : 'Claim POR Tokens'}
      </button>
    </ContentBox>
  );
};

export default ClaimForm;
