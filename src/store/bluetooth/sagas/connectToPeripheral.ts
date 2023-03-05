import {call, put, take, takeEvery} from 'redux-saga/effects';

import { BluetoothLeManager } from '../../../services';
import * as  Bluetooth from '../index'
import { scanHeartRateRequest } from '../index';

export function* connectToPeripheral(action: {
    type: typeof Bluetooth.CONNECT_DEVICE_REQUEST;
    payload: string;
  }) {
    const peripheralId = action.payload;
    yield call(BluetoothLeManager.connectToPeripheral, peripheralId);
    yield put({
      type: Bluetooth.CONNECT_DEVICE_SUCCESS,
      payload: peripheralId,
    });
    yield call(BluetoothLeManager.stopScanningForPeripherals);
    yield put(scanHeartRateRequest())
  }