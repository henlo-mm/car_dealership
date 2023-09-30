import React from 'react';
import ReactDOM from 'react-dom/client';
import {AutoHousApp} from './AutoHous-App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AutoHousApp />
    </BrowserRouter>
  </React.StrictMode>,
)
