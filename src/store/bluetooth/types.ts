

export type BluetoothPeripheral = {
    id: string;
    name: string;
    serviceUUIDs: Array<string>;
};

export type BluetoothState = {
    availableDevices: Array<BluetoothPeripheral>;
    isConnectingToDevice: boolean;
    connectedDevice: string | null;
    heartRate: number;
    isRetrievingHeartRateUpdates: boolean;
    isScanning: boolean;
};
