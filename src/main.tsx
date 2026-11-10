import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider, theme} from "antd";
import {APP_COLORS} from "./theme/colors.ts";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: APP_COLORS.primary,
                colorBgContainer: APP_COLORS.bgCard,
                colorBgLayout: APP_COLORS.bgDark,
                colorText: '#f8fafc',
                colorTextSecondary: '#94a3b8',
                colorBorder: APP_COLORS.borderIndigo,
                borderRadius: 8,
            },
        }}
    >
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>
)