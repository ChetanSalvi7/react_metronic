import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {reduxBatch} from '@manaflair/redux-batch'
import {persistStore} from 'redux-persist'
import {rootReducer} from './RootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const persistor = persistStore(store)

// sagaMiddleware.run(rootSaga)

export default store
