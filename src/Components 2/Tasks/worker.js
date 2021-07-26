// import registerPromiseWorker from 'promise-worker/register';

self.onmessage = (e) => {
    let final = 0;
    for (let i = 0; i < 100000; i++){
        final += i
    }

    console.log('reee')

    postMessage(final)
}

// registerPromiseWorker((message) => {
//   if(message.type === 'getPrimesMessage') {
//     let amount = message.amount;
//     // this function returns an array of primes
//     // [1, 2, 3, 5, 7, 11, 13, ...]
//     // let primes = calculate_first_n_primes(amount);
//     return JSON.stringify({ primes: [1, 2, 3, 4] });
//   }
// });