import {useState, useEffect} from 'react';
import axios from 'axios';

function useAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    useEffect(() => {
        axios.post('http://localhost:3001/login',{
            code,
        }).then( res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)

            console.log("Ok")
            // window.history.pushState({}, null, "/home")
        }).catch(() => {
            console.log("Erro")
            // window.location = "/"
        })
    }, [code])

    // useEffect(() => {
    //     if(!refreshToken || !expiresIn) {
    //         return
    //     }
    //     const interval = setInterval(() => {
    //         axios.post('http://localhost:3001/refresh',{
    //             refreshToken,
    //         }).then( res => {
    //             console.log(res.data.accessToken)
    //             setAccessToken(res.data.accessToken)
    //             setExpiresIn(65)
    //             // setExpiresIn(res.data.expiresIn)

    //             // window.history.pushState({}, null, "/home")
    //         }).catch(() => {
    //             window.location = "/"
    //         })
    //     }, ((expiresIn - 60) * 1000) )
    //     return () => clearInterval(interval)
    // }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth;