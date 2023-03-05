

import { Device } from 'react-native-ble-plx';
import { AnyAction } from 'redux';
import { END, eventChannel, TakeableChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import * as  Bluetooth from '../index'
import { BluetoothLeManager } from '../../../services';


type TakeableHeartRate = {
    payload: {};
    take: (cb: (message: any | END) => void) => string;
};

export function* getHeartRateUpdates(): Generator<AnyAction, void, TakeableHeartRate> {
    const onHeartrateUpdate = () =>
        eventChannel(emitter => {
            BluetoothLeManager.startStreamingData(emitter);

            return () => {
                BluetoothLeManager.stopScanningForPeripherals();
            };
        });

    const channel: TakeableChannel<string> = yield call(onHeartrateUpdate);

    try {
        while (true) {
            const response = yield take(channel);
            yield put({
                type: Bluetooth.UPDATE_HEART_RATE_SUCCESS,
                payload: response.payload,
            });
        }
    } catch (e) {
        console.log(e);
    }
}
