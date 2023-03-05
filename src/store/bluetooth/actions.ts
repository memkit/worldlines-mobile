import { BaseAction } from "../common";
import { CONNECT_DEVICE_REQUEST, SCAN_FOR_PERIPHERALS_REQUEST, START_HEART_RATE_SCAN_REQUEST } from "./constants";

export const connectDeviceRequest: (payload: string) => BaseAction = (payload) => ({
  type: CONNECT_DEVICE_REQUEST,
  payload
})

export const scanHeartRateRequest: () => BaseAction = () => ({
  type: START_HEART_RATE_SCAN_REQUEST,
})

export const watchForPeripheralsRequest: () => BaseAction = () => ({
  type: SCAN_FOR_PERIPHERALS_REQUEST
})