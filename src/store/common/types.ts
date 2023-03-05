export interface BaseAction {
    type: string
    payload?: any
}

export interface CommonState {
    currentRoute: string
}


export interface AppState {
    readonly common: CommonState
}