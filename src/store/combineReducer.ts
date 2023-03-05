
import { combineReducers } from 'redux'

import theme from './theme'
import { BluetoothStateReducer } from './bluetooth'
import { CommonStateReducer } from './common'


export const reducers = combineReducers({
    theme,
    bluetooth: BluetoothStateReducer,
    common: CommonStateReducer
  })