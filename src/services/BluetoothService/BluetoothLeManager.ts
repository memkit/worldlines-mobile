
/* eslint-disable no-bitwise */
import base64 from 'react-native-base64';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import {
  HEART_RATE_CHARACTERISTIC,
  HEART_RATE_UUID,
  VALENCELL_EXPANDED_DATA_SERVICE_UUID,
  VDC_RRI_STATUS_CHARACTERISTIC,
  VDC_RRI_DATA_REGISTER_1_CHARACTERISTIC,
  VDC_RRI_DATA_REGISTER_2_CHARACTERISTIC,
  VDC_RRI_DATA_REGISTER_3_CHARACTERISTIC,
  VDC_RRI_DATA_REGISTER_4_CHARACTERISTIC,
  VDC_RRI_DATA_REGISTER_5_CHARACTERISTIC,

  RRI_WINDOW_LENGTH,
} from './constants';

class BluetoothLeManager {
  bleManager: BleManager;
  device: Device | null;

  rrWindow: Array<number>;
  rrWindowPtr: number;
  windowRolledOver: boolean;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;

    // initialize the rr window with an empty array with the window length
    this.rrWindow = [...Array(RRI_WINDOW_LENGTH)].map(i => (0));

    // pointer to the next value to be filled by the RRI collection function.
    // should be set to (rrWindowPtr + 1) % RRI_WINDOW_LENGTH
    this.rrWindowPtr = 0;

    // can be used to get a better value for the first RRI_WINDOW_LENGTH samples.
    // by checking if the window has rolled over or not in our calc function,
    // we can assume we've only collected rrWindowPtr samples so far, and not RRI_WINDOW_LENGTH
    this.windowRolledOver = false;
  }

  pushRRI = (value: number) => {
    this.rrWindow[this.rrWindowPtr] = value;
    // always increment to the next sample, mod window length
    this.rrWindowPtr = (this.rrWindowPtr + 1) % RRI_WINDOW_LENGTH;

    // if we haven't rolled over yet, and after incrementing we've arrived at 0,
    // then set the roll over flag because we've just modulated.
    if (!this.windowRolledOver && this.rrWindowPtr === 0) {
      this.windowRolledOver = true;
    }
  }

  calculateHRV = (): number => {
    // if we've rolled over, use full window size.
    // otherwise, use the pointer for partial window length
    // this can prevent out-of-bounds values, which may lead
    // the user to thinking they've died or are having a heart attack x_x
    const numSamples = this.windowRolledOver ? RRI_WINDOW_LENGTH : this.rrWindowPtr;

    // added divide by 10 factor ?
    const rms = Math.sqrt(this.rrWindow.reduce((a, c, i, d) => a + Math.pow(c - d[i > 0 ? i - 1 : i], 2), 0) / numSamples) / 10;
    return rms;
  }

  scanForPeripherals = (
    onDeviceFound: (arg0: {
      type: string;
      payload: BleError | Device | null;
    }) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      onDeviceFound({ type: 'HEALTH', payload: scannedDevice ?? error });
      return;
    });
    return () => {
      this.bleManager.stopDeviceScan();
    };
  };

  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToPeripheral = async (identifier: string) => {
    this.device = await this.bleManager.connectToDevice(identifier);
  };

  onHeartRateUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    emitter: (arg0: { payload: number | BleError }) => void,
  ) => {
    if (error) {
      emitter({ payload: error });
    }

    const data = base64.decode(characteristic?.value ?? '');
    // console.log('got characteristic');
    const {
      value,
      isNotifying,
      serviceUUID,
      isWritableWithResponse,
      isWritableWithoutResponse,
      isNotifiable,
      serviceID,
      isIndicatable,
      id,
      uuid,
      deviceID,
      isReadable,
    } = characteristic;
    console.log(value);

    const logItem = {
      value,
      isNotifying,
      serviceUUID,
      isWritableWithResponse,
      isWritableWithoutResponse,
      isNotifiable,
      serviceID,
      isIndicatable,
      id,
      uuid,
      deviceID,
      isReadable,
    }

    let heartRate: number = -1;

    const firstBitValue: number = (<any>data[0]) & 0x01;

    if (firstBitValue === 0) {
      heartRate = data[1].charCodeAt(0);
    } else {
      heartRate =
        Number(data[1].charCodeAt(0) << 8) + Number(data[2].charCodeAt(2));
    }

    emitter({ payload: heartRate });
  };

  onRRIUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    emitter: (arg0: { payload: number | BleError }) => void,
  ) => {
    if (error) {
      emitter({ payload: error });
    }

    const data = base64.decode(characteristic?.value ?? '');
    const {
      value,
      isNotifying,
      serviceUUID,
      isWritableWithResponse,
      isWritableWithoutResponse,
      isNotifiable,
      serviceID,
      isIndicatable,
      id,
      uuid,
      deviceID,
      isReadable,
    } = characteristic;

    const logItem = {
      value,
      isNotifying,
      serviceUUID,
      isWritableWithResponse,
      isWritableWithoutResponse,
      isNotifiable,
      serviceID,
      isIndicatable,
      id,
      uuid,
      deviceID,
      isReadable,
    }

    let heartRate: number = -1;
    var values = [...Array(5)];
    const convert = (value: string) => {
      const hexString: string = base64.decode(value ?? '');
      let result = '';

      for (let i = 0; i < hexString.length; i++) {
        const hex = hexString.charCodeAt(i).toString(16);
        result += (hex.length === 2 ? hex : '0' + hex);
      }

      const bytesList = result.match(/.{2}/g)
      var hexBytes = parseInt(bytesList.reverse().join(''), 16);
      return hexBytes;
    }
    const newValue = convert(value);
    this.pushRRI(newValue);

    const hrv = this.calculateHRV();

    emitter({ payload: Math.round(hrv) });
  };


  startStreamingData = async (
    emitter: (arg0: { payload: number | BleError }) => void,
  ) => {
    await this.device?.discoverAllServicesAndCharacteristics();
    this.device?.monitorCharacteristicForService(
      HEART_RATE_UUID,
      HEART_RATE_CHARACTERISTIC,
      (error, characteristic) =>
        this.onHeartRateUpdate(error, characteristic, emitter),
    );
  };

  startStreamingHRV = async (
    emitter: (arg0: { payload: number | BleError }) => void,
  ) => {
    await this.device?.discoverAllServicesAndCharacteristics();

    const rri_registers = [
      VDC_RRI_DATA_REGISTER_1_CHARACTERISTIC,
      VDC_RRI_DATA_REGISTER_2_CHARACTERISTIC,
      VDC_RRI_DATA_REGISTER_3_CHARACTERISTIC,
      VDC_RRI_DATA_REGISTER_4_CHARACTERISTIC,
      VDC_RRI_DATA_REGISTER_5_CHARACTERISTIC
    ]
    rri_registers.forEach(async REGISTER_ID => {
      var result = await this.device?.readCharacteristicForService(
        VALENCELL_EXPANDED_DATA_SERVICE_UUID,
        REGISTER_ID,
      )

      this.device?.monitorCharacteristicForService(
        VALENCELL_EXPANDED_DATA_SERVICE_UUID,
        REGISTER_ID,
        (error, characteristic) =>
          this.onRRIUpdate(error, characteristic, emitter),
      );
    });
  };
}

const bluetoothLeManager = new BluetoothLeManager();

export default bluetoothLeManager;