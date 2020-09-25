import * as React from 'react'


const setJWTTokenCB = (value: string) => {};
let JWTToken: string;

export const Context = React.createContext({
    setJWTTokenCB,
    JWTToken
});