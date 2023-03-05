export interface BaseAction {
    type: string
    payload?: any
}

export interface CommonState {}


export interface AppState {
    readonly common: CommonState
}