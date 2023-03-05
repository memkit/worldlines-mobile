import { get } from "lodash";
import { AppState } from "./types";


export const sampleSlector = (state: AppState): string | null => get(state, 'sample', null)
