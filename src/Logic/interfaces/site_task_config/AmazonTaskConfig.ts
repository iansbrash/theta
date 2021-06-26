import Account from '../Account';
import TaskConfig from './TaskConfig';

interface AmazonTaskConfig extends TaskConfig {
    mode: AmazonModes,
    account: Account
}

export enum AmazonModes {
    "Normal",
    "Fast",
    "Preload"
}

export default AmazonTaskConfig;