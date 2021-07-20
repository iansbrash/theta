import React, { FC, useState, useEffect } from 'react';
import electron from 'electron';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addSession, removeSession } from '../../redux/reducers/sessionSlice';
import { SessionStatus } from '../../redux/reducers/sessionSlice';

const Login : FC = () => {

    const [status, setStatus] = useState<string>('Enter your liscense key')
    const [license, setLicense] = useState<string>('')

    const licenseState = useSelector((state : RootState) => state.session.license)
    const sessionState = useSelector((state : RootState) => state.session.session)
    const sessionStatus = useSelector((state : RootState) => state.session.status)

    const dispatch = useDispatch();

    // attempt to validate auth if session is active
    useEffect(() => {
        (async () => {
            console.log(`'in useEffect for authing:' ${licenseState + ', ' + sessionState}`)
            if (sessionStatus === SessionStatus.Populated && licenseState !== '' && sessionState !== '') {
                console.log('Session status is popualted!')
                setStatus('Authenticating...')

                try {
                    const res = await axios({
                        method: 'post',
                        url: 'https://uwaecaqreh.execute-api.us-east-1.amazonaws.com/Beta/auth/validate',
                        headers: {
                            license: licenseState,
                            session: sessionState
                        }
                    })

                    // in case we want to change session on auth... which we probably should 😂
                    dispatch(addSession(res.headers.session, licenseState))
                    electron.ipcRenderer.invoke('writejson', 'session.json', {session: res.headers.session, license: licenseState})
                    electron.ipcRenderer.invoke('authenticated')
                }
                catch (err) {
                    if (err.response.status === 404) {
                        setStatus('Invalid liscense key')
                    }
                    else if (err.response.status === 403) {
                        setStatus('Key is already active')
                    }
                    else {
                        setStatus('Unknown authentication error')
                    }
                }
            }
        })();

    }, [sessionStatus])

    const attemptAuth = async () => {
            
        // return await electron.ipcRenderer.invoke('authenticated');

        try {
            setStatus('Authenticating...')

            const res = await axios({
                method: 'post',
                url: `https://uwaecaqreh.execute-api.us-east-1.amazonaws.com/Beta/auth/desktop`,
                headers: {
                    license: license
                }
            })

            dispatch(addSession(res.headers.session, license))
            electron.ipcRenderer.invoke('writejson', 'session.json', {session: res.headers.session, license: license})

            console.log(res);
            electron.ipcRenderer.invoke('authenticated')
        }
        catch (err) {
            if (err.response.status === 401) {
                setStatus('Key is already active')
            }
            else if (err.response.status === 404) {
                setStatus('Invalid liscense key')
            }
            else {
                setStatus('Unknown authentication error')
            }
        }
    }


    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-theta-sidebar p-5 rounded-md">
            <div className="font-medium text-lg text-theta-gray-7 m-1">
                {status}
            </div>
            <div className="w-full justify-center items-center flex flex-row mb-10">
                <div className="transition duration-500 ease-in-out border-theta-sidebar-dark hover:border-theta-logo flex justify-center items-center rounded-lg shadow-lg w-auto border h-10 bg-theta-bg flex-row">
                    <div className="text-theta-gray-7 mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <input 
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="placeholder-indigo-300 focus:outline-none bg-theta-bg w-72 text-xl text-theta-gray-7 placeholder-theta-gray-7"
                    placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
                <button
                className="transition duration-500 ease-in-out border-theta-sidebar-dark hover:border-theta-logo focus:outline-none h-10 w-10 justify-center items-center flex border text-theta-gray-7 rounded-md ml-2 text-theta-gray-7 bg-theta-bg"
                onClick={() => attemptAuth()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </div>
            
        </div>
    )
}

export default Login;