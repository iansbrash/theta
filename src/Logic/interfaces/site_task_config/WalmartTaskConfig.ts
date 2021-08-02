import Account from '../Account';
import TaskConfig from './TaskConfig';

interface WalmartTaskConfig extends TaskConfig {
    mode: WalmartModes,
    account?: Account
}

export enum WalmartModes {
    "Normal" = "Normal",
}

export default WalmartTaskConfig;