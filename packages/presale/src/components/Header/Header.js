import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitterSquare,
  faInstagramSquare,
  faLinkedin,
  faMedium,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { useContractContext } from 'contexts/ContractContext';
import logo from 'images/portoken-logo21.png';
import contractConfig from 'config/contract.json';
import Root, { Logo, SubTitle, SocialIcons, SocialIconLink, ButtonsWrapper } from './Header.style';

const Header = () => {
  const { connect, disconnect, active } = useContractContext();

  const [userBsc, setUserBsc] = useState('');
  const [showRefModal, setShowRefModal] = useState(false);
  const handleAddToMetamaskButtonClick = useCallback(async () => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: contractConfig.address, // The address that the token is at.
          symbol: contractConfig.symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          image: contractConfig.image, // A string url of the token logo
        },
      },
    });
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

  return (
    <Root>
      <Logo src={logo} alt="Portoken logo" />
      <SubTitle className="mt-4 text-light">Join Portoken Presale</SubTitle>

      <SocialIcons>
        <SocialIconLink target="_blank" href="https://twitter.com/portumatoken">
          <FontAwesomeIcon icon={faTwitterSquare} />
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
        <SocialIconLink target="_blank" href="https://t.me/portumatoken">
          <FontAwesomeIcon icon={faTelegram} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://discord.com/invite/4Sr4jKChEb">
          <FontAwesomeIcon icon={faDiscord} />
        </SocialIconLink>
      </SocialIcons>

      <ButtonsWrapper>
        <Button
          disabled={!contractConfig.address}
          onClick={handleAddToMetamaskButtonClick}
          className="btn-light mt-4"
        >
          Add To Metamask
        </Button>
        {active ? (
          <Button onClick={disconnect} className="btn-danger mt-4">
            Disconnect
          </Button>
        ) : (
          <Button onClick={connect} className="btn-success mt-4">
            Connect
          </Button>
        )}
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
