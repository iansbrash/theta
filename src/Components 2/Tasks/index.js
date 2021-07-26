import PromiseWorker from 'promise-worker';
// import Worker from 'worker-loader!./worker';
// import { Worker } from 'worker_threads'
const worker = new Worker("./worker.js");
const promiseWorker = new PromiseWorker(worker);
const getPrimes = (amount) => promiseWorker.postMessage({
  type: 'getPrimesMessage', amount
});
export default { getPrimes }