import Account from '../Account';
import TaskConfig from './TaskConfig';

interface AmazonTaskConfig extends TaskConfig {
    mode: AmazonModes,
    account: Account
}

export enum AmazonModes {
    "Normal" = "Normal",
    "Fast" = "Fast",
    "Preload" = "Preload",
}

export default AmazonTaskConfig;