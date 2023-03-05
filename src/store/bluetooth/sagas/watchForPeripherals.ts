import {AnyAction} from 'redux';
import {END, eventChannel, TakeableChannel} from 'redux-saga';
import {Device} from 'react-native-ble-plx';
import { BluetoothLeManager } from '../../../services';
import {call, put, take, select} from 'redux-saga/effects';
import * as  Bluetooth from '../index'
import { useSelector } from 'react-redux';
import { availableDevicesSlector, BluetoothPeripheral } from '../index';
const totalScanDevicesThreshold = 1

type TakeableDevice = {
    payload: {id: string; name: string; serviceUUIDs: string};
    take: (cb: (message: any | END) => void) => Device;
  };

export function* watchForPeripherals(): Generator<AnyAction, void, TakeableDevice> {
    const onDiscoveredPeripheral = () =>
      eventChannel(emitter => {
        return BluetoothLeManager.scanForPeripherals(emitter);
      });
  
    const channel: TakeableChannel<Device> = yield call(onDiscoveredPeripheral);
  
    try {
      while (true) {
        const response = yield take(channel);
        const totalCountOfDevices = yield select(availableDevicesSlector)
        if(totalCountOfDevices && totalCountOfDevices.length === totalScanDevicesThreshold){
          BluetoothLeManager.stopScanningForPeripherals()
        }
        yield put({
          type: Bluetooth.ON_DEVICE_DISCOVERED,
          payload: {
            id: response.payload.id,
            name: response.payload.name,
            serviceUUIDs: response.payload.serviceUUIDs,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  