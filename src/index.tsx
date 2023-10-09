import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
// Apps
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'

import './_metronic/assets/sass/theme.sass'

import 'react-phone-input-2/lib/style.css'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, } from './app/modules/auth'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import store, {persistor} from "./setup/redux/Store";
import {setupAxios} from "./setup";

setupAxios(axios,store)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
    createRoot(container).render(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate persistor={persistor}
                             loading={<div>Loading...</div>}>
                    <AuthProvider>
                        <AppRoutes/>
                    </AuthProvider>
                </PersistGate>
            </Provider>
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    )
}
