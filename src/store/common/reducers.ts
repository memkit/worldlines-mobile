import { CommonState } from "./types";
import {COMMON_INITIAL_STATE} from './state'

export const CommonStateReducer : (state: any, action: any) => CommonState = (state = COMMON_INITIAL_STATE, action) =>{
    switch (action.type) {
        default:
          return state
      }
}
