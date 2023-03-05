import { SAMPLE_ACTION_REQUEST } from "./constants";
import { BaseAction } from "./types";

export const sampleRequest: () => BaseAction = () => ({
    type: SAMPLE_ACTION_REQUEST
  })