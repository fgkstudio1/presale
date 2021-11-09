import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitterSquare,
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faMedium,
  faYoutube,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

import Root, {
  Logo,
  SubTitle,
  SocialIcons,
  SocialIconLink,
  ButtonsWrapper,
  AuthSection,
} from './Header.style';

import logo from 'images/portoken-logo21.png';
import { useContractContext } from '../../contexts/ContractContext';

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    56, // mainnet
    97, // testnet
  ],
});

const Header = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const { closeTime, claimed } = useContractContext();

  const [userBsc, setUserBsc] = useState('');
  const [showRefModal, setShowRefModal] = useState(false);
  const handleAddToMetamaskButtonClick = useCallback(() => {
    alert('Add to MetaMask');
  }, []);

  const handleToggleRefModal = useCallback(() => {
    setShowRefModal(!showRefModal);
  }, [showRefModal]);

  const handleUserBscChange = useCallback((e) => {
    setUserBsc(e.target.value);
  }, []);

  const refLink = useMemo(() => {
    if (userBsc) {
      return `https://maximatoken.com/presale/?ref=${userBsc}`;
    }
  }, [userBsc]);

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

  return (
    <Root>
      <AuthSection>
        {active ? (
          <Button onClick={disconnect} className="btn-danger mb-4">
            Disconnect
          </Button>
        ) : (
          <Button onClick={connect} className="btn-success mb-4">
            Connect
          </Button>
        )}
      </AuthSection>
      <Logo src={logo} alt="Portoken logo" />
      <SubTitle className="mt-4 text-light">Join Portoken Presale</SubTitle>

      <SocialIcons>
        <SocialIconLink target="_blank" href="https://twitter.com/portumatoken">
          <FontAwesomeIcon icon={faTwitterSquare} />
        </SocialIconLink>
        <SocialIconLink
          target="_blank"
          href="https://www.facebook.com/Portumatoken-101476355450848"
        >
          <FontAwesomeIcon icon={faFacebookSquare} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://www.instagram.com/portumatoken/">
          <FontAwesomeIcon icon={faInstagramSquare} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://www.linkedin.com/company/portumatoken/">
          <FontAwesomeIcon icon={faLinkedin} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://portumatoken.medium.com/">
          <FontAwesomeIcon icon={faMedium} />
        </SocialIconLink>
        <SocialIconLink
          target="_blank"
          href="https://www.youtube.com/channel/UCWy5m7fs4KWL75u-I8_D_5g?app=desktop"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://t.me/portumatoken">
          <FontAwesomeIcon icon={faTelegram} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://discord.com/">
          <FontAwesomeIcon icon={faDiscord} />
        </SocialIconLink>
      </SocialIcons>

      <ButtonsWrapper>
        <Button onClick={handleAddToMetamaskButtonClick} className="btn-light mt-4">
          Add To Metamask
        </Button>
        {/* eslint-disable-next-line max-len */}
        {/*<Button onClick={handleToggleRefModal} className="btn-outline-light mt-4">Get Your Refferal Link</Button>*/}
      </ButtonsWrapper>

      <Modal show={showRefModal} onBackdropClick={handleToggleRefModal}>
        <Modal.Header>
          <Modal.Title>Get Your Refferal Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mt-2 py-1">
            <FormGroup className={'w-100'}>
              <FormControl
                onChange={handleUserBscChange}
                type="text"
                placeholder="Enter Your BSC Address"
                className="mt-2"
              />
            </FormGroup>
            <FormGroup className={'w-100'}>
              <FormControl
                type="text"
                placeholder="Click for get ref"
                value={refLink}
                className="mt-3"
              />
            </FormGroup>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleToggleRefModal} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Root>
  );
};

export default Header;
