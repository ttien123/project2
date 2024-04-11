import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import './index.css';
import GlobalStyles from './components/GlobalStyles';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={{ hashed: false }}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
