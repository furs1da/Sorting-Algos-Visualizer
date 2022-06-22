import React, { useState, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
  }


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const showLoadingScreen = () => {
        dispatch({type: 'LOADING'});
    }
    const showLoadingCompletedScreen = () => {
        dispatch({type: 'COMPLETED'});
    }

    useEffect(() => {
        const timer = setTimeout( () => {
            showLoadingScreen();
            console.log(state);
            setTimeout(() => {
                showLoadingCompletedScreen();  
            }, 1500);
        }, 2250)
        return () => clearTimeout(timer);
    }, []);
    

    return (
        <AppContext.Provider
        value = {{
            ...state,
            
        }}
        >
           {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
export { AppContext, AppProvider }
