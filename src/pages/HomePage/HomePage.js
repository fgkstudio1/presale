import React, { useMemo } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import Header from 'components/Header';
import ContentBox from 'components/ContentBox';
import { useContractContext } from 'contexts/ContractContext';
import Price from 'components/Price';
import ClaimForm from 'components/ClaimForm';
import TradeForm from 'components/TradeForm';
import LinkColumn from 'components/LinkColumn';
import formatNumber from 'utils/formatNumber';
import { Description, SpreadToCorners, LineBreak } from './HomePage.style';
import contractConfig from 'config/contract.json';

/* eslint-disable max-len */
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

    return formatNumber(collected / totalTokens) * 100;
  }, [tokensLeft, totalTokens]);

  return (
    <Container className="pt-4">
      <Header />

      <Row>
        <Col>
          <ContentBox title="Portoken Presale">
            <Description className="text-muted mt-3" style={{ marginBottom: 30 }}>
              To be among the top 100 coins by creating its own ecosystem and to reach the goal of 1
              billion dollars.
            </Description>

            <LineBreak />

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
              <Col xs={{ span: 6, order: 1 }} md={{ span: 4, order: 1 }}>
                <Price name={'Softcap'} price={`${softCap} BNB`} />
              </Col>
              <Col xs={{ span: 6, order: 2 }} md={{ span: 4, order: 1 }}>
                <Price name={'Min Invest'} price={`${minInvest} BNB`} />
              </Col>
              <Col xs={{ span: 6, order: 3 }} md={{ span: 4, order: 1 }}>
                <Price name={'Open Time'} price={openTime} />
              </Col>
              <Col xs={{ span: 6, order: 1 }} md={{ span: 4, order: 2 }}>
                <Price name={'Hardcap'} price={`${hardCap} BNB`} />
              </Col>
              <Col xs={{ span: 6, order: 2 }} md={{ span: 4, order: 2 }}>
                <Price name={'Max Invest'} price={`${maxInvest} BNB`} />
              </Col>
              <Col xs={{ span: 6, order: 3 }} md={{ span: 4, order: 2 }}>
                <Price name={'Close Time'} price={closeTime} />
              </Col>
            </Row>

            <p
              className="text-h1 mb-0 text-center"
              style={{ marginTop: 50, fontWeight: 'bold', fontSize: 20 }}
            >
              Your Investment
            </p>
            <Row>
              <Col xs={12} md={4}>
                <Price name={'Your Token'} price={`${tokenToClaim} ${contractConfig.symbol}`} />
              </Col>

              <Col xs={12} md={4}>
                <Price name={'Your BNB Investment'} price={`${investments} BNB`} />
              </Col>

              <Col xs={12} md={4}>
                <Price name={'Price'} price={`1 ${contractConfig.symbol} = ${tokenPrice} BNB`} />
              </Col>
            </Row>
          </ContentBox>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={6} className="mt-4">
          <TradeForm />
        </Col>
        <Col sm={12} md={12} lg={6} className="mt-4">
          <ClaimForm />
        </Col>
      </Row>

      <Row style={{ marginTop: 15 }}>
        <Col>
          <ContentBox title="Important Links">
            <Row>
              <Col xs={6}>
                <LinkColumn
                  name={'Token Contract Address'}
                  linkLabel={contractConfig.address || 'TBA'}
                  link={
                    contractConfig.address
                      ? `${contractConfig.contractBaseAddress}/${contractConfig.address}`
                      : null
                  }
                />
              </Col>
              <Col xs={6}>
                <LinkColumn
                  name={'Pancakeswap Address'}
                  linkLabel={contractConfig.pancakeSwapAddress || 'TBA'}
                  link={
                    contractConfig.pancakeSwapAddress ? contractConfig.pancakeSwapAddress : null
                  }
                />
              </Col>
              <Col xs={6}>
                <LinkColumn
                  name={'Presale Contract Address'}
                  linkLabel={contractConfig.presaleAddress}
                  link={`${contractConfig.presaleBaseAddress}/${contractConfig.presaleAddress}`}
                />
              </Col>
              <Col xs={6}>
                <LinkColumn
                  name={'Audit'}
                  linkLabel={'Solidity Finance Audit'}
                  link={contractConfig.auditAddress}
                />
              </Col>
            </Row>
          </ContentBox>
        </Col>
      </Row>
    </Container>
  );
};
/* eslint-enable */

export default HomePage;
