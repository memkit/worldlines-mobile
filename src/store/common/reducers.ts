import { CommonState } from "./types";
import {COMMON_INITIAL_STATE} from './state'
import { NAVIGATION_CHANGE } from "./constants";

export const CommonStateReducer : (state: any, action: any) => CommonState = (state = COMMON_INITIAL_STATE, action) =>{
    switch (action.type) {
        case NAVIGATION_CHANGE:
            return {
                ...state,
                currentRoute: action.payload
            }
        default:
            console.log(action);
            return state
      }
}
