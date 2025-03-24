declare interface ReducerAction<Type, Payload = any> {
    type: T;
    payload: Payload;
}