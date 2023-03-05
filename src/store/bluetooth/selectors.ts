import { get, isEmpty, isNull } from "lodash";
import { createSelector } from '@reduxjs/toolkit'


export const availableDevicesSlector = (state) => get(state, 'bluetooth.availableDevices', [])
export const defaultDevicesSlector = createSelector([availableDevicesSlector], (allDevices)=>{
    if(allDevices.length > 0){
        return allDevices[0];
    }
    return null
})
export const heartRateSlector = (state) => get(state, 'bluetooth.heartRate', "--")

export const heartRateVariabilitySlector = (state) => get(state, 'bluetooth.heartRateVariability', '--')


export const isConnectedSlector = (state) => !isEmpty(get(state, 'bluetooth.connectedDevice', null))

