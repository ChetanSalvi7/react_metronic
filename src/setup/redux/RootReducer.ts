import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'

import {persistReducer} from 'redux-persist'
import {CommonSlices} from './common/slices'
import {GroupSlices} from './groups/slices'
import {AuthSlices} from "./auth/slices";
import {UserSlices} from "./users/slices";


const authPersistConfig = {
  key: 'construction_auth',
  storage: storage,
}



export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlices.reducer),
  common: CommonSlices.reducer,
  users: UserSlices.reducer,
  groups: GroupSlices.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

