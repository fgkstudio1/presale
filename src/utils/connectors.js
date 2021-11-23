import { InjectedConnector } from '@web3-react/injected-connector';
import contractConfig from '../config/contract.json';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: contractConfig.supportedChainIds,
});
