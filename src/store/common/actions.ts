import { SAMPLE_ACTION_REQUEST, NAVIGATION_CHANGE } from "./constants";
import { BaseAction } from "./types";

export const sampleRequest: () => BaseAction = () => ({
    type: SAMPLE_ACTION_REQUEST
})

export const navigationChange: (routeName: string) => BaseAction = (routeName) => ({
  type: NAVIGATION_CHANGE,
  payload: routeName
})