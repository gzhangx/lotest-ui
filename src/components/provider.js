import React from 'react';
const DEFAULT_STATE = {
    loggedIn: false
};
const MainContext = React.createContext(DEFAULT_STATE);

export {
    DEFAULT_STATE,
    MainContext,
}