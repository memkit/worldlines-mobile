import { BluetoothState } from "./types";

export const BLUETOOTH_INITIAL_STATE: BluetoothState = {
    availableDevices: [],
    isConnectingToDevice: false,
    connectedDevice: null,
    heartRate: 0,
    isRetrievingHeartRateUpdates: false,
    isScanning: false,
}
