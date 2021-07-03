import tsLogger from './logger';

// what does a good wrapper need?
// number of max retries
// acceptable status codes to retry
// delay between retries
// option for infinite retries
// option for both infinite retries and break on error code

// interface requestWrapperOptions {
//     retryLimit: number,
//     delay: number
// }

interface RetryWrapperOptions {
    baseDelay: number,
    numberOfTries: number,
    consoleRun: string,
    consoleError: string
}

// https://markus.oberlehner.net/blog/retry-failed-api-requests-with-javascript/
const requestRetryWrapper = (
    callback : Function, 
    wrapperOptions : RetryWrapperOptions = {
        baseDelay: 3000, 
        numberOfTries: 3,
        consoleRun: 'Running function',
        consoleError: 'Error in function'
    }) : (...p : any) => Promise<any> => async (...params : any) => {

        // we are two functions deep
        const {
            baseDelay,
            numberOfTries,
            consoleRun,
            consoleError
        } = wrapperOptions;

        const retry : Function = async (attempt = 1) => {

        try {
            tsLogger(consoleRun)
            return await callback(...params);
        } 
        catch (error) {
            if (attempt >= numberOfTries) {
                tsLogger(consoleError);
                throw error;
                // logger.log('Maximum attempts reached')
                // return new Promise(() => null);
            };
    
            // Use an increasing delay to prevent flodding the
            // server with requests in case of a short downtime.
            const delay = baseDelay; // * attempt;
    
            // if (logger) logger.warn('Retry because of', error);
    
            return new Promise(resolve => setTimeout(() => resolve(retry(attempt + 1)), delay));
        }
    }
    return retry();
};

export default requestRetryWrapper;