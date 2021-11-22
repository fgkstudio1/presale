import React, { useMemo } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import Header from 'components/Header';
import ContentBox from 'components/ContentBox';
import { useContractContext } from 'contexts/ContractContext';
import Price from 'components/Price';
import ClaimForm from 'components/ClaimForm';
import TradeForm from 'components/TradeForm';
import formatNumber from 'utils/formatNumber';
import { Description, SpreadToCorners } from './HomePage.style';
import contractConfig from 'config/contract.json';

const HomePage = () => {
  const {
    values: {
      tokenPrice,
      hardCap,
      softCap,
      investments,
      minInvest,
      maxInvest,
      tokensLeft,
      totalTokens,
      totalCollected,
      tokenToClaim,
      openTime,
      closeTime,
      totalInvestorsCount,
    },
  } = useContractContext();

  const progress = useMemo(() => {
    const collected = totalTokens - tokensLeft;

    return formatNumber(collected / totalTokens);
  }, [tokensLeft, totalTokens]);

  return (
    <Container className="pt-4">
      <Header />

      <Row>
        <Col>
          <ContentBox title="Portoken Presale">
            <Description className="text-muted mt-3 mb-0">
              To be among the top 100 coins by creating its own ecosystem and to reach the goal of 1
              billion dollars.
            </Description>

            <p className="mt-3 progress-text2 mb-0">{tokenPrice} BNB Per Token</p>

            <SpreadToCorners>
              <p className="progress-text">{formatNumber(totalCollected)} BNB Raised</p>

              <p>{totalInvestorsCount} Participants</p>
            </SpreadToCorners>

            <ProgressBar now={progress} label={`${progress}%`} striped variant="success" />

            <SpreadToCorners>
              <p className="progress-text">{`${progress}%`}</p>

              <p>
                {formatNumber(totalCollected)} / {hardCap} BNB
              </p>
            </SpreadToCorners>

            <Row>
              <Col xs={6} md={4}>
                <Price name={'Softcap'} price={`${softCap} BNB`} />
              </Col>
              <Col xs={6} md={4}>
                <Price name={'Min Invest'} price={`${minInvest} BNB`} />
              </Col>
              <Col xs={6} md={4}>
                <Price name={'Open Time'} price={openTime} />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <Price name={'Hardcap'} price={`${hardCap} BNB`} />
              </Col>
              <Col xs={6} md={4}>
                <Price name={'Max Invest'} price={`${maxInvest} BNB`} />
              </Col>
              <Col xs={6} md={4}>
                <Price name={'Close Time'} price={closeTime} />
              </Col>
            </Row>

            <p className="text-h1 mt-3 mb-0">Your Investment</p>
            <Row style={{ marginTop: '20px' }}>
              <Col xs={6} md={4}>
                <Price name={'Your Token'} price={`${tokenToClaim} ${contractConfig.symbol}`} />
              </Col>

              <Col xs={6} md={4}>
                <Price name={'Your BNB Investment'} price={`${investments} BNB`} />
              </Col>

              <Col xs={6} md={4}>
                <Price name={'Price'} price={`1 ${contractConfig.symbol} = ${tokenPrice} BNB`} />
              </Col>
            </Row>
            {/* eslint-disable-next-line max-len */}
            {/* <span class="text-warning "> Please first get your airdrop reward. If you buy token first you can't join Airdrop</span>*/}
            {/* eslint-disable-next-line max-len */}
            {/*<ReferralInput type="text" id="airinput" readonly value="0x32a33b6cd2Ffc7ccfDfC40aaFb87f6Eb1B31651e" class="input-group refferal-input py-2" />*/}
          </ContentBox>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm={12} md={12} lg={6}>
          <TradeForm />
        </Col>
        <Col sm={12} md={12} lg={6}>
          <ClaimForm />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
