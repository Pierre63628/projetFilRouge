import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { worker } from './mocks/browser';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

worker.start().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
