import styled from 'styled-components';

export const Logo = styled.img`
  width: 100%;
  max-width: 20rem;
`;

export const SubTitle = styled.h3``;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 3rem;

  &:hover {
    color: #fff;
  }

  & + * {
    margin-left: 1.5rem;
  }
`;

export const ButtonsWrapper = styled.span`
  display: flex;

  .btn,
  .btn:hover,
  .btn:active,
  .btn:focus {
    color: #212529 !important;
    border: 0 !important;

    + .btn {
      margin-left: 1rem;
    }
  }
`;

export const Root = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export default Root;
