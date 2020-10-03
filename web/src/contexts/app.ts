import * as React from 'react'


const setJWTTokenCB = (value: string) => {};
let JWTToken: string;
const setUIDCB = (value: number) => {};
let UID: number;

export const Context = React.createContext({
    setJWTTokenCB,
    JWTToken,
    setUIDCB,
    UID,
});