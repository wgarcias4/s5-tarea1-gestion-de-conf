import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))
root.render(
    <>
        <App />
    </>
)
