import styled from 'styled-components';

// @todo: delete
export const ClaimButton = styled.span`
  background-color: #676767;
  color: #cacaca !important;
  font-weight: 600;
  border-radius: 2rem;
  font-size: 15px;
  border: none !important;
  padding: 1rem 0.75rem !important;
  display: table;
  margin: 2rem auto 0 auto;
`;

export const SpreadToCorners = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  color: #fff;

  p {
    margin: 0;
    font-size: 16px;
    line-height: 2rem;
    padding: 0;

    &:last-child {
      font-size: 14px;
    }
  }
`;

export const Description = styled.p`
  font-size: 1.8rem;
  color: #eaae05 !important;
  opacity: 0.7;
`;

export const LineBreak = styled.div`
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  opacity: 0.2;
  display: table;
  margin: 0 auto 40px auto;
`;
