import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import './index.css';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <ReduxProvider store={store}>
      <Suspense
          fallback={
              <Spin
                  style={{ position: 'absolute', top: '50%', left: '50%' }}
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
          }
      >
          <App />
      </Suspense>
    </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
