import {useEffect, useState} from 'react'
import './App.css'
import Api from "./api.js";

import Modal from './components/Modal.js'

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
            <Modal />
        </>
    )
}

export default App
