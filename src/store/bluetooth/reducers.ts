import { BluetoothState, BluetoothPeripheral } from "./types";
import {BLUETOOTH_INITIAL_STATE} from './state'
import {
    CONNECT_DEVICE_REQUEST,
    ON_DEVICE_DISCOVERED,
    SCAN_FOR_PERIPHERALS_REQUEST,
    START_HEART_RATE_SCAN_REQUEST,
    UPDATE_HEART_RATE_SUCCESS,
    UPDATE_HRV_SUCCESS,
} from './constants'
import { CONNECT_DEVICE_SUCCESS } from ".";
const identifyRhythmDevice = 'rhythm'

export const BluetoothStateReducer : (state: any, action: any) => BluetoothState = (state = BLUETOOTH_INITIAL_STATE, action) =>{
    switch (action.type) {
        case SCAN_FOR_PERIPHERALS_REQUEST:
            return {...state, isScanning: true}
            break;
        case CONNECT_DEVICE_REQUEST:
            return {...state, isConnectingToDevice: true}
            break;
        case CONNECT_DEVICE_SUCCESS:
                return {...state, isConnectingToDevice: false, connectedDevice: action.payload }
                break;
        case START_HEART_RATE_SCAN_REQUEST:
            return {...state, isRetrievingHeartRateUpdates: true}
            break;  
        case UPDATE_HEART_RATE_SUCCESS: 
            console.log('updating heart rate value');
            return {...state, heartRate: action.payload}
            break; 
        case UPDATE_HRV_SUCCESS: 
            console.log('updating HRV value');
            return {...state, heartRateVariability: action.payload}
            break;
        case ON_DEVICE_DISCOVERED:
            const isDuplicate = state.availableDevices.some(
                (device : BluetoothPeripheral) => {
                   return  device.id === action.payload.id
                }
              );
              const isCorsenseMonitor = action.payload?.name
                ?.toLowerCase()
                ?.includes(identifyRhythmDevice);
              if (!isDuplicate && isCorsenseMonitor) {
                return {...state, availableDevices: state.availableDevices.concat(action.payload)}
              }
              return state
        break;
        default:
          return state
      }
}
