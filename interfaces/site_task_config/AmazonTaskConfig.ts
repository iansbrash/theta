import Account from '../Account';
import TaskConfig from './TaskConfig';

interface AmazonTaskConfig extends TaskConfig {
    mode: AmazonModes,
    account: Account
}

enum AmazonModes {
    "normal",
    "fast",
    "preload"
}

export default AmazonTaskConfig;