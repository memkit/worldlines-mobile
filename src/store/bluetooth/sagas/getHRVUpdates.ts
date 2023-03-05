import { Device } from 'react-native-ble-plx';
import { AnyAction } from 'redux';
import { END, eventChannel, TakeableChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import * as  Bluetooth from '../index'
import { BluetoothLeManager } from '../../../services';


type TakeableHRV = {
    payload: {};
    take: (cb: (message: any | END) => void) => string;
};

export function* getHRVUpdates(): Generator<AnyAction, void, TakeableHRV> {
    const onHRVUpdate = () =>
        eventChannel(emitter => {
            BluetoothLeManager.startStreamingHRV(emitter);

            return () => {
                BluetoothLeManager.stopScanningForPeripherals();
            };
        });

    const channel: TakeableChannel<string> = yield call(onHRVUpdate);

    try {
        while (true) {
            const response = yield take(channel);
            yield put({
                type: Bluetooth.UPDATE_HRV_SUCCESS,
                payload: response.payload,
            });
        }
    } catch (e) {
        console.log(e);
    }
}
