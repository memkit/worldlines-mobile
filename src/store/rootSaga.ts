
import { call, takeEvery, put, all } from "redux-saga/effects";
import * as Bluetooth from './bluetooth';
export default function* rootSaga() {
  yield all([
    takeEvery(
      Bluetooth.SCAN_FOR_PERIPHERALS_REQUEST,
      Bluetooth.watchForPeripherals
    ),
    takeEvery(
      Bluetooth.CONNECT_DEVICE_REQUEST,
      Bluetooth.connectToPeripheral
    ),
    takeEvery(
      Bluetooth.START_HEART_RATE_SCAN_REQUEST,
      Bluetooth.getHeartRateUpdates,
    ),
    takeEvery(
      Bluetooth.START_HEART_RATE_SCAN_REQUEST,
      Bluetooth.getHRVUpdates,
    )
  ])
}