import {useEffect, useState} from 'react'
import './App.css'
import Api from "./api.js";

const api = new Api()

function App() {
    const [status, setStatus] = useState('KO')

    useEffect(() => {
        api.getStatus().then((res) => {
            setStatus(res.status)
        })
    }, [])

    return (
        <>
            <h1>Detective Box!!!</h1>
            <p>API Status: {status}</p>
        </>
    )
}

export default App
