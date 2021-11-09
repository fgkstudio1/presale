import React, { useCallback } from 'react';
import TextInput from 'components/TextInput';
import ContentBox from 'components/ContentBox';
import { useContractContext } from 'contexts/ContractContext';

const ClaimForm = () => {
  const {
    values: { tokenPrice, tokenToClaim },
    methods: { claimTokens },
  } = useContractContext();

  const handleClimButtonClick = useCallback(() => {
    if (claimTokens) {
      claimTokens(tokenToClaim * tokenPrice, (error, response) => {
        console.log({ error, response });
      });
    }
  }, [tokenPrice, tokenToClaim, claimTokens]);

  return (
    <ContentBox title="Claim PORT Token">
      <div className="input-group mt-4">
        <TextInput type="text" className="dark-input w-100 mt-2" readOnly value={tokenToClaim} />
      </div>
      <p className="text-muted mt-3">
        You Can Claim your Tokens After: <b id="claimTokenDate" />
      </p>
      <button
        className="btn btn-primary buy-button claim-max-button w-100 py-3"
        onClick={handleClimButtonClick}
      >
        Claim PORT Tokens
      </button>
    </ContentBox>
  );
};

export default ClaimForm;
